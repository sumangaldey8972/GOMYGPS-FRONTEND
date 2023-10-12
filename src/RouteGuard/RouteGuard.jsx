import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { useCheckSession } from '../hooks/useAuth'
import { check_session } from '../Redux/Auth/auth.action'

const RouteGuard = ({ children }) => {
    const dispatch = useDispatch()
    const [auth, setAuth] = useState(null)
    const navigate = useNavigate()

    const onSuccess = (res) => {
        dispatch(check_session(res))
        console.log("res", res)
        if (res.status) {
            setAuth(true)
        } else {
            navigate('/login')
        }
    }

    useCheckSession(onSuccess)

    if (auth) {
        return children
    } else if (auth != null) {
        return <Navigate to="/login" />
    }
}

export default RouteGuard