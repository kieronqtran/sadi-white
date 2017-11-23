import {
  AUTHENTICATED,
  UNAUTHENTICATED,
  AUTHENTICATION_ERROR,
} from '../actions/authentication-actions';


export default function authReducer(state = {}, action) {
  switch (action.type) {
    case AUTHENTICATED:
      return { authenticated: true, isAdmin: action.payload.auth === "ROLE_ADMIN" ,user: action.payload };
    case UNAUTHENTICATED:
      return { authenticated: false, user: action.payload };
    case AUTHENTICATION_ERROR:
      return { authenticated: false, error: action.payload };
  }
  return state;
}
