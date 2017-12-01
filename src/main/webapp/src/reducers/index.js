import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'
import authReducer from './auth'
import userReducer from './user'

const combinedReducer = combineReducers({
  user: userReducer,
  form: formReducer,
	auth: authReducer,
	router: routerReducer,
})

export default combinedReducer
