import {
    SET_SEARCH_STRING,
    SET_CATEGORY,
    TOGGLE_FAVOURITES_DRAWER
} from '../actions/typeConstants';

var initialState = {
    searchString: '',
    category: '',
    isFavouritesDrawerOpen: false
}

export const news = (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCH_STRING:
            return Object.assign({}, state, {
                searchString: action?.payload?.searchString
            });
        case SET_CATEGORY:
            return Object.assign({}, state, {
                category: action?.payload?.category
            });
        case TOGGLE_FAVOURITES_DRAWER:
            return Object.assign({}, state, {
                isFavouritesDrawerOpen: !state.isFavouritesDrawerOpen
            });
        default:
            return state
    }
}