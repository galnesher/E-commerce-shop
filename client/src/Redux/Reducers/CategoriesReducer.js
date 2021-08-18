import { GET_ALL_CATEGORIES_FAILED, GET_ALL_CATEGORIES_SUCCESS } from "../Types/types";

const categoriesReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ALL_CATEGORIES_SUCCESS:
            return { categories: action.categories }
        case GET_ALL_CATEGORIES_FAILED:
            return { categories: action.categories }

        default:
            return state
    }
}

export { categoriesReducer };