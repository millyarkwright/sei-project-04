import axios from 'axios'
import { Buffer } from 'buffer'

// * Setting token

export const setToken = (token) => {
  window.localStorage.setItem('aroma-token', token)
  // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
}

// * Getting token

export const getToken = () => {
  let token = window.localStorage.getItem('aroma-token')
  console.log('HITS GET TOKEN', token)
  return window.localStorage.getItem('aroma-token')
}

// verify token by checking it exists and is JWT, aiming to return payload as object

export const getPayload = () => {
  const token = getToken()
  if (!token) return
  const splitToken = token.split('.')
  if (splitToken.length !==3) return
  return JSON.parse(Buffer.from(splitToken[1], 'base64'))
}

export const getUserName = () => {
  const payload = getPayload()
  const { username } = payload
  return username
}

// * Check that expiry date is in the future

export const userIsAuthenticated = () => {
  const payload = getPayload()
  if (!payload) return
  const currentTime = Math.round(Date.now() / 1000)
  return currentTime < payload.exp
}


// ! GET LOGIN TEXT 
let loginText = ''
export const getText = (text) => {
  loginText = text
  console.log('loginText-->', loginText)
  return loginText
}

// ! DISPLAY LOGIN TEXT
export const loginTextDisplay = () => {
  const text = loginText
  console.log(text)
  return (
    <span className='nav-logged-in'>{text}</span>
  )
}