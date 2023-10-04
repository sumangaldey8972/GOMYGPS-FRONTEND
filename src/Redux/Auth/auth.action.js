import { CHECK_SESSION, CHECK_SESSION_ERROR, LOGIN_FAILED, LOGIN_SUCCESSFULL, LOGOUT_SUCCESSFULL } from "./auth.types"


export const login_action = (creds) => async (dispatch) => {
    if (creds.status) {
        return dispatch({
            type: LOGIN_SUCCESSFULL,
            payload: creds.data
        })
    } else {
        return dispatch({
            type: LOGIN_FAILED,
            payload: creds.message
        })
    }
}


export const check_session = (response) => async (dispatch) => {
    if (response.status) {
        return dispatch({
            type: CHECK_SESSION,
            payload: response.data,
            status: response.status
        })
    } else {
        return dispatch({
            type: CHECK_SESSION_ERROR,
            stauts: response.status
        })
    }
}

export const logout = (response) => async (dispatch) => {
    return dispatch({
        type: LOGOUT_SUCCESSFULL,
        status: response.status
    })
};