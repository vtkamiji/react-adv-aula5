//dispatch é um método que manda para o início da lista
//de Midlewares
export default function({ dispatch }) {
    return next => action => {
        //if the action does not have payload
        //or, the payload does not have a .then property
        //we dont care about it, send it on
        if (!action.payload || !action.payload.then) {
            //vai para o próximo Middleware
            next(action);
        }

        action.payload
            .then(response => {
                //create new action with the old type, but
                //replace the promise with the reponse data
                const newAction = {...action, payload: response};
                //Manda de volta ao inicio da lista de Middlewares
                //para passar em todos novamente
                dispatch(newAction);
            });

    };
}