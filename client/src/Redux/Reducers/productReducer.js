import { GET_FILTERED_PRODUCT_SUCCESS, GET_ALL_PRODUCTS_FAILED, GET_ALL_PRODUCTS_SUCCESS, UPLOAD_PRODUCT_FAILED, UPLOAD_PRODUCT_SUCCESS, GET_FILTERED_PRODUCT_FAILED, GET_ORDER_BY_PRICE_SUCCESS, GET_ORDER_BY_PRICE_FAILED } from "../Types/types";

const productReducer = (state = {}, action) => {
    switch (action.type) {
        case UPLOAD_PRODUCT_SUCCESS:
            return { productUploaded: action.payload }
        case UPLOAD_PRODUCT_FAILED:
            return { productUploaded: action.payload }
        case GET_ALL_PRODUCTS_SUCCESS:
            return { products: action.payload }
        case GET_ALL_PRODUCTS_FAILED:
            return { products: action.payload }
        case GET_FILTERED_PRODUCT_SUCCESS:
            return { products: action.payload }
        case GET_FILTERED_PRODUCT_FAILED:
            return { products: action.payload }
        case GET_ORDER_BY_PRICE_SUCCESS:
            return { products: action.payload }
        case GET_ORDER_BY_PRICE_FAILED:
            return { products: action.payload }
        default:
            return state
    }
}

export { productReducer };