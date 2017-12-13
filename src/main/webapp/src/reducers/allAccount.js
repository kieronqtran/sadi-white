import {
  GET_ALL_ACCOUNT_SUCCESSFULL
} from '../actions/authentication-actions'

export default function allUserReducer(state = [], action) {
  switch (action.type) {
    case GET_ALL_ACCOUNT_SUCCESSFULL:
      state = action.allAccounts
      return state
    default:
      return state
  }
}
