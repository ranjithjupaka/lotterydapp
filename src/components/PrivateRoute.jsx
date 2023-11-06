import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { LotteryContext } from '../contexts/LotteryContext'

const PrivateRoute = ({ children,auth }) => {
  console.log(auth)

  if (!auth) {
    return <Navigate to='/' />
  }

  return children
}

export default PrivateRoute
