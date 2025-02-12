import React, { useContext, useEffect } from 'react'
import { AppContext } from '../context/UserContext'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const {token} = useContext(AppContext);

    if(!token){
        return <Navigate to="/login" replace />
    }
  return children
}

export default ProtectedRoute