import { baseUrl } from "../../utils";
import { CREATE_ORDER_FAILED, CREATE_ORDER_SUCCESS } from "../Types/types"

export const createOrderAction = (order) => (dispatch) => {
    fetch(`${baseUrl}/api/order/createorder`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json'
        },
        body: JSON.stringify(order),
    }).then((res) => res.json())
        .then((data) => {
            console.log(data);
            if (data._id) {
                localStorage.removeItem('cartItems')
                dispatch({
                    type: CREATE_ORDER_SUCCESS,
                    payload: data
                })
            } else {
                dispatch({
                    type: CREATE_ORDER_FAILED,
                    payload: data.error.message
                })
            }
        })
}
