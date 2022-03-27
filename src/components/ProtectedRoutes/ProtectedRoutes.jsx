import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoutes() {
    
    let auth = localStorage.getItem('userToken');
    
  return ( 
      auth? <Outlet /> : <Navigate to='/login' /> 
    )
}
