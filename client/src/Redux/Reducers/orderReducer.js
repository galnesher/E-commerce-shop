import { CREATE_ORDER_FAILED, CREATE_ORDER_SUCCESS } from "../Types/types";

const orderReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_ORDER_SUCCESS:

            return {
                ...state,
                order: action.payload
            }
        case CREATE_ORDER_FAILED:
            return {
                ...state,
                order: action.payload
            }
        default:
            return state
    }
}
export { orderReducer };