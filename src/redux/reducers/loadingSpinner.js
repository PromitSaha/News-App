import {
    SHOW_LOADING_SPINNER,
    HIDE_LOADING_SPINNER
} from '../actions/typeConstants';

var initialState = {
    loadingSpinnerVisible: false
}

export const loadingSpinner = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_LOADING_SPINNER:
            return Object.assign({}, state, {
                loadingSpinnerVisible: true,
            });
        case HIDE_LOADING_SPINNER:
            return Object.assign({}, state, {
                loadingSpinnerVisible: false,
            });
        default:
            return state
    }
}