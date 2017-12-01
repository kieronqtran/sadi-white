import {
  GET_CURRENT_USER_DATA_SUCCESSFUL,
  GET_CURRENT_USER_DATA_FAIL
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
    case GET_CURRENT_USER_DATA_SUCCESSFUL:
      return { ...state, userProfile: action.data }
    case GET_CURRENT_USER_DATA_FAIL:
      return { ...defaultValue , error: action.message }
    default:
      return state
  }
}
