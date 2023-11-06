import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Herosection from './components/Herosection'
import History from './components/History'
import LoginModal from './common/LoginModal'
import ReferralProgram from './components/ReferralProgram'
import Profile from './components/Profile'
import PrivateRoute from './components/PrivateRoute'
import { contractABI, erc20abi, networks } from './utils/constants'
import { useEffect, useState } from 'react'
import { ethers, providers } from 'ethers'
import { toast } from 'react-toastify'
import Header from './components/Header'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const [signer, setSigner] = useState(null)
  const [account, setAccount] = useState(null)
  const [contract, setContract] = useState(null)
  const [username, setUsername] = useState('')
  const [auth, setAuth] = useState(false)
  const [reftkn, setReftkn] = useState(null)
  const [refferals, setRefferals] = useState([])
  const [loading, setLoading] = useState(false)
  const [balance, setBalance] = useState(false)
  const [authcode, setAuthcode] = useState('')
  const [transactions, setTransactions] = useState([])
  const [refferaltoken, setRefferalToken] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [tknAddress, setTknAddress] = useState('')
  const [provider, setProvider] = useState('')
  const [contractAddress, setContractAdress] = useState('')

  const initiateWalletConnection = async (provi) => {
    try {
      // Check if MetaMask or a similar wallet provider is available
      console.log(provi)
      if (provi) {
        console.log(provi, window.ethereum)
        // switchToBNB()
        const provider = new ethers.providers.Web3Provider(provi)
        const { name, chainId } = await provider.getNetwork()
        console.log(name, chainId)

        if (chainId != 56) {
          toast('Switch Network to Binance')
        }

        const accounts = await provider.send('eth_requestAccounts', [])
        const acc = accounts[0]
        const signer = provider.getSigner()
        console.log('signer', signer)

        let contAddress, tknAddress, cont, resp
        if (chainId == 56) {
          contAddress = networks[chainId].contractAddress
          tknAddress = networks[chainId].tokenAddress
          console.log(contAddress, tknAddress)

          cont = new ethers.Contract(contAddress, contractABI, signer)

          resp = await cont.getUserAuth(acc)
          console.log(acc, cont, resp)

          if (!resp) {
            setIsOpen(true)
          } else {
            await getUserName(cont, acc)
            await getUserBal(cont, acc)
            await getRefferals(cont, acc)
            await getRefToken(cont, acc)
            await getAuthcode(cont)
            await getTransactions(cont, acc)
          }
        } else if (chainId == 11155111) {
          contAddress = networks[chainId].contractAddress
          tknAddress = networks[chainId].tokenAddress
          console.log(contAddress, tknAddress)

          cont = new ethers.Contract(contAddress, contractABI, signer)

          resp = await cont.getUserAuth(acc)
          console.log(acc, cont, resp)

          if (!resp) {
            setIsOpen(true)
          } else {
            await getUserName(cont, acc)
            await getUserBal(cont, acc)
            await getRefferals(cont, acc)
            await getRefToken(cont, acc)
            await getAuthcode(cont)
            await getTransactions(cont, acc)
          }
        }

        setSigner(signer)
        setAccount(acc)
        setContract(cont)
        setTknAddress(tknAddress)
        setAuth(resp)
        setProvider(provider)
        setContractAdress(contAddress)
      } else {
        console.error('MetaMask or similar wallet provider not found.')
      }
    } catch (error) {
      console.error('Error while connecting wallet:', error)
    }
  }

  const getUserBal = async (cont, acc) => {
    try {
      const bal = await cont.getUserBalance(acc)
      const usdtVal = ethers.utils.formatUnits(bal, 18)
      console.log(usdtVal)
      setBalance(usdtVal)
    } catch (error) {
      console.log(error)
    }
  }

  const getRefferals = async (cont, acc) => {
    try {
      const refferals = await cont.getRefferals(acc)
      console.log(refferals)
      setRefferals(refferals)
    } catch (error) {
      console.log(error)
    }
  }

  const getRefToken = async (cont, acc) => {
    try {
      console.log(cont)
      const reftkn = await cont.getRefferalToken(acc)
      console.log(reftkn)
      setReftkn(reftkn)
    } catch (error) {
      console.log(error)
    }
  }

  const getAuthcode = async (cont) => {
    try {
      const authcode = await cont.getAuthCode()
      console.log(authcode)
      setAuthcode(authcode)
    } catch (error) {
      console.log(error)
    }
  }

  const getUserName = async (cont, acc) => {
    try {
      const username = await cont.getUserName(acc)
      console.log(username)
      setUsername(username)
    } catch (error) {
      console.log(error)
    }
  }

  const withdrawFunds = async (amount) => {
    const damount = ethers.utils.parseUnits(amount, 18)
    console.log(damount)
    try {
      await contract.userWithDraw(damount)
      await getUserBal(contract, account)
      console.log(contract)
    } catch (error) {
      const errmsg = error.message
      console.log(errmsg)
      if (errmsg.includes('transfer amount exceeds balance')) {
        toast('transfer amount exceeds balance')
      }
    }
  }

  const depositFunds = async (amount) => {
   
    try {
      const tokenContract = new ethers.Contract(tknAddress, erc20abi, signer)
      let allowance = await tokenContract.allowance(account, contractAddress)
      allowance = ethers.utils.formatEther(allowance)
      console.log('allowance', allowance, 'amount', amount)
      
       const damount = ethers.utils.parseUnits(amount, 18)
       console.log(damount)

       if (allowance >= amount) {
         await contract.deposit(damount, { gasLimit: 500000 })
         await getUserBal(contract, account)
         console.log('deposit funds', contract)
       } else {
         toast(
           'Your allowance is less than deposit amount. Approve amount to deposit funds'
         )
         await tokenContract.approve(contractAddress, damount)
       }
    } catch (error) {
      console.log(error)
    }
  }

  const playGame = async (amount, number) => {
    const damount = ethers.utils.parseUnits(amount, 18)
    try {
      const resp = await contract.playGameWeb(damount, number, {
        gasLimit: 500000,
      })
      let randnum = await contract.randomNumber()
      randnum = ethers.utils.formatUnits(randnum, 1)
      console.log(resp, randnum%10)
      return randnum % 10
    } catch (error) {
      console.log(error)
      toast(error)
      return null
    }
  }

  const getTransactions = async (cont, acc) => {
    try {
      console.log(cont)
      const transactions = await cont.getTransactions(acc)
      setTransactions(transactions)
    } catch (error) {
      console.log(error)
    }
  }

  const disconnectAccount = () => {
    setAuth(false)
  }

  const onCreatAccount = async (userName) => {
    try {
      if (refferaltoken) {
        await contract.registerUserWithToken(userName, refferaltoken)
      } else {
        await contract.registerUser(userName)
      }

      const resp = await contract.getUserAuth(account)
      console.log(userName, resp)
      if (resp) {
        await getUserName(cont, acc)
        await getUserBal(cont, acc)
        await getRefferals(cont, acc)
        await getRefToken(cont, acc)
        await getAuthcode(cont)
        await getTransactions(cont, acc)

        setSigner(signer)
        setAccount(acc)
        setContract(cont)
        setAuth(resp)
      }

      setAuth(resp)
      setIsOpen(false)
    } catch (error) {
      console.log(error)
    }
  }

  function closeModal() {
    setIsOpen(false)
  }

  const addBNB = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send('wallet_addEthereumChain', [
      {
        chainId: '0x38',
        chainName: 'Binace Smart Chain',
        nativeCurrency: {
          name: 'BNB',
          symbol: 'BNB',
          decimals: 18,
        },
        rpcUrls: ['https://bsc-dataseed.binance.org/'],
        blockExplorerUrls: ['https://bscscan.com/'],
      },
    ])
  }

  const switchToBNB = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send('wallet_switchEthereumChain', [{ chainId: '0x38' }])
    } catch (error) {
      if (error.code === 4902) {
        await addBNB()
      } else {
        console.log(error)
      }
    }
  }

  return (
    <div>
      <BrowserRouter>
        <Header
          disconnectAccount={disconnectAccount}
          initiateWalletConnection={initiateWalletConnection}
          auth={auth}
          contract={contract}
          balance={balance}
          username={username}
          withdrawFunds={withdrawFunds}
          depositFunds={depositFunds}
          refferaltoken={refferaltoken}
          onCreatAccount={onCreatAccount}
          isOpen={isOpen}
          closeModal={closeModal}
        />
        <Routes>
          <Route
            index
            element={
              <Herosection
                auth={auth}
                playGame={playGame}
                setRefferalToken={setRefferalToken}
                balance={balance}
              />
            }
          />
          <Route
            path='/history'
            element={<History auth={auth} transactions={transactions} />}
          />
          <Route
            path='/referralprogram'
            element={
              <ReferralProgram
                reftkn={reftkn}
                refferals={refferals}
                auth={auth}
              />
            }
          />
          <Route
            path='/profile'
            element={
              <Profile
                auth={auth}
                authcode={authcode}
                username={username}
                account={account}
              />
            }
          />
        </Routes>
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
      </BrowserRouter>
    </div>
  )
}

export default App
