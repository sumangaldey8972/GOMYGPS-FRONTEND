import { CHECK_SESSION, LOGIN_FAILED, LOGIN_SUCCESSFULL, LOGOUT_SUCCESSFULL } from "./auth.types"

const initial_state = {
    logged_in_user_details: {},
    isAuth: false
}

export const auth_reducer = (state = initial_state, { type, payload }) => {
    switch (type) {
        case LOGIN_SUCCESSFULL: {
            return {
                ...state,
                isAuth: true
            }
        }
        case LOGIN_FAILED: {
            return {
                ...state,
                isAuth: false
            }
        }
        case CHECK_SESSION: {
            return {
                ...state,
                logged_in_user_details: payload,
                isAuth: true
            }
        }
        case LOGOUT_SUCCESSFULL: {
            return {
                ...state,
                logged_in_user_details: {},
                isAuth: false
            }
        }
        default: {
            return state
        }
    }
}