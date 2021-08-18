import { baseUrl } from '../../utils';
import { UPLOAD_PRODUCT_SUCCESS, UPLOAD_PRODUCT_FAILED, GET_ALL_PRODUCTS_SUCCESS, GET_ALL_PRODUCTS_FAILED, GET_FILTERED_PRODUCT_SUCCESS, GET_FILTERED_PRODUCT_FAILED, GET_ORDER_BY_PRICE_SUCCESS, GET_ORDER_BY_PRICE_FAILED, GET_ALL_CATEGORIES_SUCCESS, GET_ALL_CATEGORIES_FAILED, } from '../Types/types';


export const uploadProductAction = (product) => (dispatch) => {
    fetch(`${baseUrl}/api/product/upload`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json'
        },
        body: JSON.stringify(product),
    }).then((res) => res.json())
        .then((data) => {
            if (data.data === true) {
                dispatch({
                    type: UPLOAD_PRODUCT_SUCCESS,
                    payload: data,
                })
            } else {
                dispatch({
                    type: UPLOAD_PRODUCT_FAILED,
                    payload: data,
                })
            }
        })
}
export const getAllProductAction = () => (dispatch) => {
    fetch(`${baseUrl}/api/product/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json'
        },
    }).then((res) => res.json())
        .then((data) => {
            if (data[0]) {
                dispatch({
                    type: GET_ALL_PRODUCTS_SUCCESS,
                    payload: data
                })
            } else {
                dispatch({
                    type: GET_ALL_PRODUCTS_FAILED,
                    payload: data
                })
            }
        })
}

export const filterProductsAction = (category) => (dispatch) => {
    fetch(`${baseUrl}/api/product/${category}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json'
        },
    }).then((res) => res.json())
        .then((data) => {
            if (data[0] && data[0]._id) {
                dispatch({
                    type: GET_FILTERED_PRODUCT_SUCCESS,
                    payload: data
                })
            } else {
                dispatch({
                    type: GET_FILTERED_PRODUCT_FAILED,
                    payload: data
                })
            }
        })
}


export const orderProductsByPriceAction = (products, selectedOrderByPrice) => (dispatch) => {
    if (selectedOrderByPrice !== 'all') {
        fetch(`${baseUrl}/api/product/orderbyprice`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify({ products, selectedOrderByPrice }),
        }).then((res) => res.json())
            .then((data) => {
                if (data) {
                    dispatch({
                        type: GET_ORDER_BY_PRICE_SUCCESS,
                        payload: data
                    });
                } else {
                    dispatch({
                        type: GET_ORDER_BY_PRICE_FAILED,
                        payload: data
                    })
                }
            })
    }
}

export const getAllCategoriesAction = () => (dispatch) => {
    fetch(`${baseUrl}/api/product/getcategories`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json'
        },
    }).then((res) => res.json())
        .then((data) => {
            if (data) {
                dispatch({
                    type: GET_ALL_CATEGORIES_SUCCESS,
                    categories: data
                })
            } else {
                dispatch({
                    type: GET_ALL_CATEGORIES_FAILED,
                    categories: data
                })
            }
        })
}


