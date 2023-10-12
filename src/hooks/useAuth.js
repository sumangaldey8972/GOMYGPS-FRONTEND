import { useMutation, useQuery } from "react-query"
import { check_session, destroy_session, login } from "../Api/authentication"
import { useDispatch } from "react-redux"
import { destroy_session_action } from "../Redux/Auth/auth.action"


export const useLoginUser = () => {
    return useMutation(login)
}

export const useCheckSession = (onSuccess) => {
    return useQuery('session', check_session, {
        onSuccess
    })
}

export const useDestroySession = () => {
    const dispatch = useDispatch()
    return useMutation(destroy_session, {
        onSuccess: (response) => {
            if (response.status) {
                dispatch(destroy_session_action(response))
            }
        }
    })
}