import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import authReducer from './auth'

function userReducer(state = {}, action) {
  switch (action.type) {
    case 'SIGN_UP':
      state = action.user
      return state
    default:
      return state
  }
}

function logInReducer(state = {}, action) {
  switch (action.type) {
    case 'USER_INFO':
      state = action.user
      return state
    default:
      return state
  }
}

const combinedReducer = combineReducers({
  logInReducer,
  userReducer,
  form: formReducer,
  auth: authReducer,
})

export default combinedReducer
