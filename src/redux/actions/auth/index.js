import useJwt from '@src/auth/jwt/useJwt'

import { Auth } from "aws-amplify"
const config = useJwt.jwtConfig

export const handleLogin = data => {
  return dispatch => {
    dispatch({
      type: 'LOGIN',
      data,
      config,
      [config.storageTokenKeyName]: data[config.storageTokenKeyName],
      [config.storageRefreshTokenKeyName]: data[config.storageRefreshTokenKeyName]
    })

    // ** Add to user, accessToken & refreshToken to localStorage
    localStorage.setItem('userData', JSON.stringify(data))
    localStorage.setItem(config.storageTokenKeyName, JSON.stringify(data.accessToken))
    localStorage.setItem(config.storageRefreshTokenKeyName, JSON.stringify(data.refreshToken))
  }
}

// ** Handle User Logout
export const handleLogout = () => {
  return dispatch => {
    dispatch({ type: 'LOGOUT', [config.storageTokenKeyName]: null, [config.storageRefreshTokenKeyName]: null })

    Auth.signOut()
    // ** Remove user, accessToken & refreshToken from localStorage
    localStorage.removeItem('sUser')
    localStorage.removeItem('cUser')
    localStorage.removeItem('tempData')
    localStorage.removeItem('userData')
    localStorage.removeItem(config.storageTokenKeyName)
    localStorage.removeItem(config.storageRefreshTokenKeyName)
  }
}
