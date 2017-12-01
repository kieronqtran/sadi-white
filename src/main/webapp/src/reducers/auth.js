import {
  AUTHENTICATED,
  UNAUTHENTICATED,
  AUTHENTICATION_ERROR,
  REFRESH_TOKEN
} from '../actions/authentication-actions'

const initState = {
	isAuthenticated: false,
  isAdmin: false,
  tokenInfo: {}
}

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case AUTHENTICATED:
      return {
        isAuthenticated: true,
        isAdmin: action.payload.authorities.includes('ROLE_ADMIN'),
        tokenInfo: action.payload,
      }
    case REFRESH_TOKEN:
      return {
        isAuthenticated: true,
        isAdmin: action.payload.authorities.includes('ROLE_ADMIN'),
        tokenInfo: action.payload,
      }
    case UNAUTHENTICATED:
      return { ...initState }
    case AUTHENTICATION_ERROR:
      return { ...initState , error: action.message }
  }
  return state
}
