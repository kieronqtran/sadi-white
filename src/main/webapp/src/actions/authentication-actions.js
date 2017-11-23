import jwtDecode from 'jwt-decode';

export const SIGN_UP_SUCCESSFUL = 'SIGN_UP_SUCCESSFUL';
export const SIGN_UP_FAILED = 'SIGN_UP_FAILED';

export function signUp(info) {
  return function(dispatch) {
    fetch(`/api/signup`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(info),
    })
      .then(res => {
        if(res.status === 201) {
          dispatch({
            type: SIGN_UP_SUCCESSFUL,
          });
        }
        if(res.status === 500) {
          dispatch({
            type: SIGN_UP_FAILED
          })
        }
      });
  };
}

export const AUTHENTICATED = 'AUTHENTICATED_USER';
export const UNAUTHENTICATED = 'UNAUTHENTICATED_USER';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';

export function signInAction({ email, password }) {
  return async dispatch => {
    fetch('/api/authenticate', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
      .then(res => res.json())
      .then(res => {
        try {
          sessionStorage.setItem('token', res.id_token);
          const payload = jwtDecode(res.id_token);
          dispatch({ type: AUTHENTICATED, payload });
          // history.push('/test')
        } catch (error) {
          dispatch({
            type: AUTHENTICATION_ERROR,
            payload: 'Invalid email or password',
          });
        }
      });
  };
}
