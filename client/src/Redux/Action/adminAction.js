import { baseUrl } from "../../utils";
import { CHECK_ROLE, GET_ALL_ORDERS_FAILED, GET_ALL_ORDERS_SUCCESS } from "../Types/types";
import { GET_ALL_USERS_SUCCESS, GET_ALL_USERS_FAILED } from '../Types/types';

export const checkUserRoleAction = () => async (dispatch) => {

    await fetch(`${baseUrl}/api/user/checkrole/`, {
        method: "POST",
        headers: {

            "Content-Type": "application/json",
            "token": localStorage.getItem('TokenAccess'),
            'Accept': 'application/json'
        },
    }).then((res) => res.json())
        .then((data) => {
            if (data) {
                dispatch({
                    type: CHECK_ROLE,
                    isAdmin: data
                })
            }
        })
};


export const getAllUsersAction = () => async (dispatch, getState) => {
    await fetch(`${baseUrl}/api/user/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json'
        },
    }).then((res) => res.json())
        .then((data) => {
            let store = getState();
            if (data) {
                dispatch({
                    type: GET_ALL_USERS_SUCCESS,
                    payload: data,
                    isAdmin: store.AdminReducer.isAdmin,
                    orders: store.AdminReducer.orders
                })
            } else {
                dispatch({
                    type: GET_ALL_USERS_FAILED,
                    payload: [],
                    isAdmin: store.AdminReducer.isAdmin,
                    orders: store.AdminReducer.orders
                })
            }
        });

};

export const getAllOrdersAction = () => async (dispatch, getState) => {
    await fetch(`${baseUrl}/api/order/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json'
        },
    }).then((res) => res.json())
        .then((data) => {
            let store = getState();
            if (data) {
                dispatch({
                    type: GET_ALL_ORDERS_SUCCESS,
                    orders: data,
                    isAdmin: store.AdminReducer.isAdmin,

                })
            } else {
                dispatch({
                    type: GET_ALL_ORDERS_FAILED,
                    orders: data,
                    isAdmin: store.AdminReducer.isAdmin,
                })
            }
        });

}

