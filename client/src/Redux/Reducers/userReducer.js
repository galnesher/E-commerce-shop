import { CREATE_USER_FAILED, CREATE_USER_SUCCESS, VERIFACATION_SUCCESS, VERIFACATION_FAILED, LOGIN_USER_SUCCESS, LOGIN_USER_FAILED, LOGOUT_USER, CHECK_USER } from "../Types/types";


const userReducer = (state = {}, action) => {
    switch (action.type) {
        case CHECK_USER:
            return {
                ...state,

                isLogged: action.isLogged
            }
        case CREATE_USER_SUCCESS:
            return {
                ...state,
                userRegisteration: action.payload
            }
        case CREATE_USER_FAILED:
            return {
                ...state,
                userRegisteration: action.payload
            }
        case VERIFACATION_SUCCESS:
            return {
                userVerified: action.verified,
                userEmail: action.userEmailAddress
            }
        case VERIFACATION_FAILED:
            return {
                userEmail: action.userEmailAddress,
                userVerified: action.verified,
            }
        case LOGIN_USER_SUCCESS:
            return {
                user: action.data,
                isLogged: action.isLogged,
            }
        case LOGIN_USER_FAILED:
            return {
                user: action.data,
                isLogged: action.isLogged,
            }
        case LOGOUT_USER:
            return {
                isLogged: action.isLogged,
            }
        default:
            return state
    }
}

export { userReducer };