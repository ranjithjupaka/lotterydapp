import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { toast } from 'react-toastify'


export const LotteryContext = React.createContext()

export const LotteryProvider = ({ children }) => {
  //   const provider = new ethers.providers.Web3Provider(ethereum)

  const [signer, setSigner] = useState(null)
  const [account, setAccount] = useState(
    localStorage.getItem('address') || null
  )
  const [contract, setContract] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [balance, setBalance] = useState(0)
  const [username, setUsername] = useState('')
  const [auth, setAuth] = useState(false)
  const [reftkn, setReftkn] = useState(null)
  const [transactions, setTransactions] = useState(null)
  const [logout, setLogout] = useState(false)
  const [refferals, setRefferals] = useState(null)

  //   useEffect(() => {
  //     console.log('useeffect...', logout)
  //     if (!logout) {
  //       localStorage.setItem('authStatus', auth)
  //       localStorage.setItem('userName', username)
  //       localStorage.setItem('address', account)
  //       localStorage.setItem('refTkn', reftkn)
  //       localStorage.setItem('balance', balance)
  //     } else {
  //       console.log('logout..')
  //       localStorage.clear()
  //       setSigner(null)
  //       setAccount(null)
  //       setContract(null)
  //       setAuth(false)
  //       setReftkn('')
  //       setBalance(0)
  //       setUsername('')
  //       setLogout(false)
  //       setContract(null)
  //     }
  //   }, [auth, username, account, reftkn, balance, logout])

  //   useEffect(() => {
  //     if (contract) {
  //       getUserBal()
  //     }
  //   }, [auth])

  const initiateWalletConnection = async () => {
    try {
      // Check if MetaMask or a similar wallet provider is available
      if (window.ethereum) {
        //   switchToBNB()
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        })
        const acc = accounts[0]
        const signer = provider.getSigner()
        console.log('signer', signer)
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        )

        const resp = await contract.getUserAuth(acc)
        console.log(acc, contract, resp)

        if (!resp) {
          openModal()
        } else {
          const username = await contract.getUserName(acc)
          console.log(username)
          setUsername(username)
          let reftkn = await contract.getRefferalToken(acc)
          reftkn = ethers.utils.formatUnits(reftkn) * 10 ** 18
          console.log(reftkn)
          setReftkn(reftkn)
          const refferals = await contract.getRefferals(acc)
          console.log(refferals)
          setRefferals(refferals)
        }

        setSigner(signer)
        setAccount(acc)
        setContract(contract)
        setAuth(resp)
      } else {
        console.error('MetaMask or similar wallet provider not found.')
      }
    } catch (error) {
      console.error('Error while connecting wallet:', error)
    }
  }

  const disconnectAccount = () => {
    setLogout(true)
  }

  const checkMetamaskInstallation = () => {
    if (window.ethereum == undefined) {
      toast('Metamask wallet is not installed')
      return false
    }

    return true
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

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const onCreatAccount = async () => {
    try {
      await contract.registerUser(username)
      const resp = await contract.getUserAuth(acc)
      console.log(username, resp)
      if (resp) {
        setUsername(username)
      }

      setAuth(resp)
      closeModal()
    } catch (error) {
      console.log(error)
    }
  }

  const getUserName = async () => {
    try {
      const username = await contract.getUserName(account)
      console.log(username)
      setUsername(username)
    } catch (error) {
      console.log(error)
    }
  }

  const getUserBal = async () => {
    try {
      console.log(contract)
      const bal = await contract.getUserBalance(account)
      const usdtVal = ethers.utils.formatUnits(bal, 18)
      console.log(usdtVal)
      setBalance(usdtVal)
    } catch (error) {
      console.log(error)
    }
  }

  const withdrawFunds = async (amount) => {
    const damount = ethers.utils.parseUnits(amount, 18)
    console.log(damount)
    try {
      const contract = new ethers.Contract(contractAddress, contractABI, signer)
      await contract.userWithDraw(damount)
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
    const damount = ethers.utils.parseUnits(amount, 18)
    console.log(damount)
    try {
      const contract = new ethers.Contract(contractAddress, contractABI, signer)
      await contract.deposit(damount)
      console.log('deposit funds', contract)
    } catch (error) {
      console.log(error)
      const errormsg = error.message
      if (errormsg.includes('insufficient allowance')) {
        const tokenContract = new ethers.Contract(
          tokenAddress,
          erc20abi,
          signer
        )

        await tokenContract.approve(contractAddress, damount)
      }
    }

    closeModal()
  }

  const getRefferals = async () => {
    try {
      const refferals = await contract.getRefferals(account)
      console.log(refferals)
      setRefferals(refferals)
    } catch (error) {
      console.log(error)
    }
  }

  const getRefToken = async () => {
    try {
      console.log(contract)
      const reftkn = await contract.getRefferalToken(account)
      console.log(reftkn)
      setReftkn(reftkn)
    } catch (error) {
      console.log(error)
    }
  }

  const getTransactions = async () => {
    try {
      console.log(contract)
      const transactions = await contract.getTransactions(account)
      setTransactions(transactions)
    } catch (error) {
      console.log(error)
    }
  }

  const playGame = async (amount, number) => {
    const damount = ethers.utils.parseUnits(amount, 18)
    try {
      const resp = await contract.playGameWeb(damount, number)
      const randnum = await contract.randomNumber()
      console.log(resp, randnum)
      return randnum % 10
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <LotteryContext.Provider
      value={{
        checkMetamaskInstallation,
        initiateWalletConnection,
        account,
        auth,
        disconnectAccount,
        setLoading,
        contract,
        balance,
        isOpen,
        onCreatAccount,
        closeModal,
        openModal,
        setUsername,
        username,
        getUserBal,
        getUserName,
        depositFunds,
        withdrawFunds,
        getRefferals,
        getTransactions,
        getRefToken,
        playGame,
        loading,
      }}
    >
      {children}
    </LotteryContext.Provider>
  )
}
