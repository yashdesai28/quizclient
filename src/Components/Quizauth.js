
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './Auths'
const Quizauth = ({children}) => {
    const location = useLocation()
    const auth = useAuth()
    if (!auth.quizid) {
        return <Navigate to='/home' state={{ path: location.pathname }} />
    }
    return children
}

export default Quizauth 