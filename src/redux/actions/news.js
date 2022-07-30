import {
    SET_SEARCH_STRING,
    SET_CATEGORY,
    TOGGLE_FAVOURITES_DRAWER
} from './typeConstants';

export const setSearchString = (searchString) => ({
    type: SET_SEARCH_STRING,
    payload: {
        searchString
    }
});

export const setCategory = (category) => ({
    type: SET_CATEGORY,
    payload: {
        category
    }
});

export const toggleFavouritesDrawer = () => ({
    type: TOGGLE_FAVOURITES_DRAWER
});