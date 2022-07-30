import { combineReducers } from 'redux';
import { loadingSpinner } from './loadingSpinner';
import { news } from "./news";

const appReducer = combineReducers({
    loadingSpinner,
    news
})

export const rootReducer = (state, action) => {
    return appReducer(state, action);
}