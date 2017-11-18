import { combineReducers } from 'redux'

function userReducer(state = {}, action){

  switch(action.type){
    case 'SIGN_UP':
      state = action.user
      return state
    default:
      return state
  }

}

const combinedReducer = combineReducers({userReducer})

export default combinedReducer