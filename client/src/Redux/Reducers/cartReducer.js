import { ADD_TO_CART, REMOVE_FROM_CART } from "../Types/types";
const cartReducer = (state = { cartItems: JSON.parse(localStorage.getItem("cartItems") || '[]') }, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                cartItems: action.payload
            }
        case REMOVE_FROM_CART:
            return {
                cartItems: action.payload
            }

        default:
            return state
    }
}
export { cartReducer };