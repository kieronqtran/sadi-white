import {
  GET_CURRENT_USER_DATA_SUCCESSFUL,
  GET_CURRENT_USER_DATA_FAIL,
  UPDATE_SUCCESSFUL,
  GET_ALL_ACCOUNT_SUCCESSFULL
} from '../actions/authentication-actions'

const defaultValue = {
	userProfile: {
    id: 0,
		email: '',
		firstName: '',
		lastName: '',
    phone: '',
    authorities: [
      'ROLE_ANONYMOUS'
    ]
	}
}

export default function userReducer(state = defaultValue, action) {
  switch (action.type) {
    case UPDATE_SUCCESSFUL:
      return{ ...state }
    case GET_CURRENT_USER_DATA_SUCCESSFUL:
      return { ...state, userProfile: action.data }
    case GET_CURRENT_USER_DATA_FAIL:
      return { ...defaultValue , error: action.message }
    default:
      return state
  }
}

