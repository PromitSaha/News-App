import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers';

export default function configureStore() {

    function logger({ getState }) {
        return next => action => {
            //console.log('will dispatch', action);
            const returnValue = next(action);

            //console.log('state after dispatch', getState());
            return returnValue;
        }
    }
    
    let store = createStore(rootReducer, applyMiddleware(logger));
    return store;
}