import { ADD_TO_CART, REMOVE_FROM_CART } from "../Types/types";

export const addToCartAction = (product) => (dispatch, getState) => {
    let cartItems = getState().CartReducer.cartItems.slice();
    let alreadyExists = false;
    cartItems.forEach((x) => {
        if (x._id === product._id) {
            alreadyExists = true;
            x.count++;
        }
    });
    if (!alreadyExists) {
        cartItems.push({ ...product, count: 1 });
    }
    dispatch({
        type: ADD_TO_CART,
        payload: cartItems,
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

export const removeFromCartAction = (product) => (dispatch, getState) => {
    const cartItems = getState().CartReducer.cartItems.slice().filter((x) => x._id !== product._id);
    dispatch({
        type: REMOVE_FROM_CART,
        payload: cartItems
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
};