// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from './auth'
import userinfo from './userinfo'
import navbar from './navbar'
import layout from './layout'
import custom from './custom'
import chat from '@src/views/chat/store/reducer'

const rootReducer = combineReducers({
  userinfo,
  custom,
  auth,
  chat,
  navbar,
  layout
})

export default rootReducer
