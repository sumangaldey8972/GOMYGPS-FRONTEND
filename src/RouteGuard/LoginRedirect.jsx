import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useCheckSession } from "../hooks/useAuth"
import { check_session } from "../Redux/Auth/auth.action"


const LoginRedirect = ({ children }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSuccess = (res) => {
        dispatch(check_session(res))
        if (res.status) {
            navigate('/')
        } else {
            navigate('/login')
        }
    }

    useCheckSession(onSuccess)

    return children
}

export default LoginRedirect