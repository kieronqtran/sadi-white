import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'
import authReducer from './auth'
import userReducer from './user'
import getTestList from './test-reducer'
import newQuestion from './takeTest-reducer'
import resultReducer from './result'
import manageTest from './postTest-reducer'


const combinedReducer = combineReducers({
  user: userReducer,
  result: resultReducer,
  form: formReducer,
	auth: authReducer,
	router: routerReducer,
  test: getTestList,
  manageTest: newQuestion,
  makeTest: manageTest,
})

export default combinedReducer
