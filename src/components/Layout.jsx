import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { LotteryContext } from '../contexts/LotteryContext'
import Loader from '../common/Loader'
import { internalMutate } from 'swr/_internal'

const Layout = ({
  initiateWalletConnection,
  disconnectAccount,
  loading,
  auth,
  contract,
  balance,
  username,
}) => {
  //   const { loading } = useContext(LotteryContext)
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header
            disconnectAccount={disconnectAccount}
            initiateWalletConnection={initiateWalletConnection}
            auth={auth}
            contract={contract}
            balance={balance}
            username={username}
          />
          <Outlet />
          <Footer />
          <ToastContainer
            position='top-right'
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='dark'
          />
        </>
      )}
    </>
  )
}

export default Layout
