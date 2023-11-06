import { useState, useEffect, useContext } from 'react'
import Logo from '../assets/images/logo1.jpg'
import eth from '../assets/images/eth.png'
import DropDown from '../common/DropDown'
import LoginModal from '../common/LoginModal'
import { LotteryContext } from '../contexts/LotteryContext'
import DepositModal from '../common/DepositModal'
import WithdrawModal from '../common/WithdrawModal'
import { toast } from 'react-toastify'
import detectEthereumProvider from '@metamask/detect-provider'
import { useNavigate } from 'react-router-dom'

function Header({
  initiateWalletConnection,
  disconnectAccount,
  auth,
  contract,
  balance,
  username,
  withdrawFunds,
  depositFunds,
  isOpen,
  onCreatAccount,
  closeModal,
}) {
  const [isOpenD, setIsOpenD] = useState(false)
  const [isOpenW, setIsOpenW] = useState(false)
  const navigate = useNavigate()

  const isMobileDevice = () => {
    return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  }

  const checkMetamaskInstallation = () => {
    if (window.ethereum == undefined && !isMobileDevice()) {
      toast('Metamask wallet is not installed')
      return false
    }

    return true
  }

  function closeModal() {
    setIsOpenW(false)
  }

  function closeModalD() {
    setIsOpenD(false)
  }

  const onClickConnect = async (e) => {
    e.preventDefault()
    console.log('Mobile: ', isMobileDevice())

    const provider = await detectEthereumProvider()
    console.log(provider, window.ethereum)
    if (window != undefined && window.ethereum != undefined) {
      await initiateWalletConnection(window.ethereum)
    } else {
      toast(' Metamask not installed')
    }

    // if (window.ethereum != undefined) {
    //   console.log(window.ethereum)
    //   await initiateWalletConnection(window.ethereum)
    // } else if (isMobileDevice()) {
    //   console.log('redirecting....')
    //   window.location.href = 'https://metamask.app.link/dapp/betdapp.co/'
    // } else {
    //   toast('Please Install Metamask')
    // }
  }

  const onDepositClick = async (e) => {
    e.preventDefault()
    setIsOpenD(true)
  }

  const onWithdrawClick = async (e) => {
    e.preventDefault()
    setIsOpenW(true)
  }

  useEffect(() => {
    console.log('loaded..', auth, balance)
  }, [balance])

  return (
    <>
      <div className='bg-rhino sticky top-0 z-10'>
        <div className='flex justify-between items-center px-16 py-[18px]'>
          <div>
            <a href='/' target='_self'>
              <img src={Logo} alt='Logo' height={60} width={60} />
            </a>
          </div>

          {auth ? (
            <>
              <div className='gap-[15px] flex items-center text-white  '>
                <div className='flex items-center gap-[10px] bg-blue/100 w-[197px] pl-5 rounded-[5px] py-1'>
                  <img src={eth} alt='eth' />
                  <div className='flex flex-col text-base'>
                    <span>{balance}</span>
                    <span className='text-xs text-white/[44%]'>USDT</span>
                  </div>
                </div>
                <div>
                  <button
                    className='font-Montserrat text-lg gradient font-semibold px-7 py-[9px]  rounded-[5px] '
                    onClick={onDepositClick}
                  >
                    Deposit
                  </button>
                </div>
                <div>
                  <button
                    className='font-Montserrat text-lg gradient font-semibold px-7 py-[9px]  rounded-[5px] '
                    onClick={onWithdrawClick}
                  >
                    Withdraw
                  </button>
                </div>
              </div>
              <DropDown
                disconnectAccount={disconnectAccount}
                username={username}
              />
            </>
          ) : (
            <>
              <div className=' flex items-center gap-10 text-white'>
                {/* <div>
                  <button
                    className='font-Montserrat text-base font-semibold'
                    onClick={signupAccount}
                  >
                    Sign up
                  </button>
                </div> */}
                <div>
                  <button
                    className='font-Montserrat text-base gradient font-semibold px-7 py-[3px]  rounded-[10px] '
                    onClick={onClickConnect}
                  >
                    Connect
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {!auth && (
        <LoginModal
          isOpen={isOpen}
          onCreatAccount={onCreatAccount}
          closeModal={closeModal}
        />
      )}
      {auth && (
        <DepositModal
          isOpenD={isOpenD}
          closeModalD={closeModalD}
          depositFunds={depositFunds}
        />
      )}
      {auth && (
        <WithdrawModal
          isOpen={isOpenW}
          closeModal={closeModal}
          withdrawFunds={withdrawFunds}
        />
      )}
    </>
  )
}
export default Header
