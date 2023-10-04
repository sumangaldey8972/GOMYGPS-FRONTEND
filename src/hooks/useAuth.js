import { useMutation } from "react-query"
import { login } from "../Api/authentication"


export const useLoginUser = () => {
    return useMutation(login)
}