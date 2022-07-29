import { combineReducers } from 'redux';
import { loadingSpinner } from './loadingSpinner';

const appReducer = combineReducers({
    loadingSpinner
})

export const rootReducer = (state, action) => {
    return appReducer(state, action);
}