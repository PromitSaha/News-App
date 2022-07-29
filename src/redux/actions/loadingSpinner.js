import {
    SHOW_LOADING_SPINNER,
    HIDE_LOADING_SPINNER
} from './typeConstants';

export const showLoadingSpinner = () => ({
    type: SHOW_LOADING_SPINNER
})

export const hideLoadingSpinner = () => ({
    type: HIDE_LOADING_SPINNER
})