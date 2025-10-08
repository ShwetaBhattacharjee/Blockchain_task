/*Author:Shweta Bhattacharjee
Date: 06-10-2025*/
import { setGlobalState, setAlert } from './store'


declare global {
  interface Window {
    ethereum?: any
  }
}

const { ethereum } = window


export const connectWallet = async (): Promise<void> => {
  try {
    if (!ethereum) {
      setAlert('Please install MetaMask to connect your wallet', 'red')
      return
    }

    const accounts = await ethereum.request({ 
      method: 'eth_requestAccounts' 
    })

    if (accounts && accounts.length > 0) {
      setGlobalState('connectedAccount', accounts[0].toLowerCase())
      setGlobalState('walletModal', 'scale-0')
      setAlert('Wallet connected successfully!', 'green')
    }
  } catch (error: any) {
    reportError(error)
  }
}

/**
 * Check if wallet is already connected
 */
export const isWalletConnected = async (): Promise<void> => {
  try {
    if (!ethereum) return

    const accounts = await ethereum.request({ method: 'eth_accounts' })

    // Listen for chain changes
    window.ethereum.on('chainChanged', () => {
      window.location.reload()
    })

    // Listen for account changes
    window.ethereum.on('accountsChanged', async (accounts: string[]) => {
      if (accounts.length > 0) {
        setGlobalState('connectedAccount', accounts[0].toLowerCase())
      } else {
        setGlobalState('connectedAccount', '')
        setAlert('Wallet disconnected', 'red')
      }
    })

    if (accounts.length > 0) {
      setGlobalState('connectedAccount', accounts[0].toLowerCase())
    }
  } catch (error: any) {
    reportError(error)
  }
}

/**
 * Disconnect wallet
 */
export const disconnectWallet = (): void => {
  setGlobalState('connectedAccount', '')
  setAlert('Wallet disconnected', 'green')
}

/**
 * Check if MetaMask is installed
 */
export const isMetaMaskInstalled = (): boolean => {
  return typeof window.ethereum !== 'undefined'
}

/**
 * Report error to user
 */
const reportError = (error: any): void => {
  let errorMessage = 'An error occurred'

  if (error.code === 4001) {
    errorMessage = 'Connection request rejected'
  } else if (error.code === -32002) {
    errorMessage = 'Connection request already pending. Please check MetaMask.'
  } else if (error.message) {
    errorMessage = error.message
  }

  setAlert(errorMessage, 'red')
  console.error('Wallet Error:', error)
}