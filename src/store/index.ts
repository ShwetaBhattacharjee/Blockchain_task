import { createGlobalState } from 'react-hooks-global-state'

const { setGlobalState, useGlobalState, getGlobalState } = createGlobalState({
  connectedAccount: '',
  walletModal: 'scale-0',
  alert: { show: false, msg: '', color: '' },
})

const setAlert = (msg: string, color: string = 'green') => {
  setGlobalState('alert', { show: true, msg, color })
  setTimeout(() => {
    setGlobalState('alert', { show: false, msg: '', color: '' })
  }, 6000)
}

const truncate = (
  text: string,
  startChars: number,
  endChars: number,
  maxLength: number
): string => {
  if (text.length > maxLength) {
    const start = text.substring(0, startChars)
    const end = text.substring(text.length - endChars, text.length)
    return start + '...' + end
  }
  return text
}

export { useGlobalState, setGlobalState, getGlobalState, setAlert, truncate }