import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'
import authReducer from './auth'
import userReducer from './user'
import getTestList from './test-reducer'
import newQuestion from './takeTest-reducer'

function resultReducer(state = [], action) {
  switch (action.type) {
      case 'USER_RESULT':
          state = action.result
          return state
      default:
          return state
  }
}

const combinedReducer = combineReducers({
  user: userReducer,
  result: resultReducer,
  form: formReducer,
	auth: authReducer,
	router: routerReducer,
  test: getTestList,
  takeTest: newQuestion,
})

export default combinedReducer
