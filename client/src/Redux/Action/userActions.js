import { baseUrl } from "../../utils"
import { CREATE_USER_SUCCESS, CREATE_USER_FAILED, VERIFACATION_SUCCESS, VERIFACATION_FAILED, LOGIN_USER_SUCCESS, LOGIN_USER_FAILED, LOGOUT_USER, CHECK_USER } from "../Types/types"

export const registerAction = (user) => (dispatch) => {
    fetch(`${baseUrl}/api/user/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json'
        },
        body: JSON.stringify(user),
    }).then((res) => res.json())
        .then((data) => {
            if (data.success) {
                dispatch(
                    {
                        type: CREATE_USER_SUCCESS,
                        payload: data,
                    }
                )
            } else {
                dispatch({
                    type: CREATE_USER_FAILED,
                    payload: data,
                })
            }
        })
}


export const verificationCodeAction = (code) => (dispatch) => {
    fetch(`${baseUrl}/api/user/verification`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json'
        },
        body: JSON.stringify(code),
    }).then((res) => res.json())
        .then((data) => {
            if (data === true) {
                dispatch(
                    {
                        type: VERIFACATION_SUCCESS,
                        verified: data,
                        userEmailAddress: localStorage.getItem('UserEmailAddress')
                    }
                )
            } else {
                dispatch({
                    type: VERIFACATION_FAILED,
                    verified: data,
                    userEmailAddress: localStorage.getItem('UserEmailAddress')
                })
            }
        })
}

export const loginAction = (user) => (dispatch) => {
    fetch(`${baseUrl}/api/user/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json'
        },
        body: JSON.stringify(user),
    }).then((res) => res.json())
        .then((data) => {
            if (data.token) {
                localStorage.setItem('TokenAccess', data.token);
                localStorage.setItem('UserName', `${data.user.firstName} ${data.user.lastName}`);
                localStorage.setItem('UserId', data.user._id)
                if (data.user.role !== "Admin") {
                    dispatch(
                        {
                            type: LOGIN_USER_SUCCESS,
                            data: data,
                            isLogged: true,
                            isAdmin: false

                        });
                } else {
                    dispatch(
                        {
                            type: LOGIN_USER_SUCCESS,
                            data: data,
                            isLogged: true,
                            isAdmin: true
                        });
                }
            } else {
                dispatch({
                    type: LOGIN_USER_FAILED,
                    data: data,
                    isLogged: false,
                    isAdmin: false
                });
            }
        })
}

export const logoutAction = () => (dispatch) => {
    localStorage.removeItem('TokenAccess');
    localStorage.removeItem('UserName');
    localStorage.removeItem('UserId');
    localStorage.removeItem('UserEmailAddress');
    dispatch({
        type: LOGOUT_USER,
        isLogged: false
    });
}

export const checkUserAction = () => (dispatch) => {
    if (localStorage.getItem('TokenAccess')) {
        fetch(`${baseUrl}/api/user/checkToken`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem('TokenAccess'),
                'Accept': 'application/json'
            },
        }).then((res) => res.json())
            .then((data) => {
                if (data === true) {
                    dispatch({
                        type: CHECK_USER,
                        isLogged: true
                    })
                } else {
                    dispatch({
                        type: CHECK_USER,
                        isLogged: false
                    })
                }
            })
    } else {
        dispatch({
            type: CHECK_USER,
            isLogged: false,
        })
    }
};





