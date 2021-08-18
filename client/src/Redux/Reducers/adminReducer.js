import { CHECK_ROLE, GET_ALL_ORDERS_FAILED, GET_ALL_ORDERS_SUCCESS, GET_ALL_USERS_FAILED, GET_ALL_USERS_SUCCESS } from "../Types/types";

const adminReducer = (state = { isAdmin: false }, action) => {
    switch (action.type) {
        case CHECK_ROLE:
            return {
                ...state,
                isAdmin: action.isAdmin,
            }
        case GET_ALL_USERS_SUCCESS:
            return {
                ...state,
                users: action.payload,
                isAdmin: action.isAdmin,
            }
        case GET_ALL_USERS_FAILED:
            return {
                ...state,
                users: action.payload,
                isAdmin: action.isAdmin,

            }
        case GET_ALL_ORDERS_SUCCESS:
            return {
                ...state,
                isAdmin: action.isAdmin,
                orders: action.orders
            }
        case GET_ALL_ORDERS_FAILED:
            return {
                ...state,
                isAdmin: action.isAdmin,
                orders: action.orders
            }
        default:
            return state
    }
}

export { adminReducer };