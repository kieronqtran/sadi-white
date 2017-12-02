import jwtDecode from 'jwt-decode'
import { push } from 'react-router-redux'

export const SIGN_UP_SUCCESSFUL = 'SIGN_UP_SUCCESSFUL'
export const SIGN_UP_FAILED = 'SIGN_UP_FAILED'

export const GET_CURRENT_USER_DATA_SUCCESSFUL = 'GET_CURRENT_USER_DATA_SUCCESSFUL'
export const GET_CURRENT_USER_DATA_FAIL = 'GET_CURRENT_USER_DATA_FAIL'

export const REFRESH_TOKEN = 'REFRESH_TOKEN'

export const AUTHENTICATED = 'AUTHENTICATED_USER'
export const UNAUTHENTICATED = 'UNAUTHENTICATED_USER'
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR'

export const UPDATE_SUCCESSFUL = 'UPDATE_SUCCESSFUL'
export const UPDATE_ERROR = 'UPDATE_ERROR'


export function refreshToken() {
	return async dispatch => {
		const refresh_token = sessionStorage.getItem('refresh_token')
		if (refresh_token) {
			fetch('/oauth/token', {
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/x-www-form-urlencoded',
					Authorization: 'Basic d2ViX2FwcDpjaGFuZ2VpdA==',
				},
				method: 'POST',
				body: `grant_type=refresh_token&refresh_token=${sessionStorage.getItem('refresh_token')}`,
			})
				.then(res => res.json())
				.then(res => {
					sessionStorage.setItem('token', res.access_token)
          sessionStorage.setItem('refresh_token', res.refresh_token)
          const tokenExpireTime = Date.now() + res.expires_in * 1000
          sessionStorage.setItem('tet', tokenExpireTime.toString())
					const payload = jwtDecode(res.access_token)
					dispatch({ type: REFRESH_TOKEN, payload })
				})
		}

	}
}

export function logOut() {
  return async dispatch => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('refresh_token')
    dispatch({type: UNAUTHENTICATED })
  }
}

export function updateInfo(info) {
  return async dispatch => {
    try {
      const token =  sessionStorage.getItem('token')
      const response = await fetch('/api/account', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(info)
      })
      const data = await response.json()
      dispatch({type: UPDATE_SUCCESSFUL, user: data})

    } catch (error) {
      return dispatch({type: UPDATE_ERROR, message: 'Invalid input'})
    } finally {
      alert("Profile Updated");
    }
  }
}

export function signUp(info) {
	return function (dispatch) {
		fetch('/api/signUp', {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify(info),
		}).then(res => {
			if (res.status === 201) {
				dispatch({
					type: SIGN_UP_SUCCESSFUL,
				})
			}
			if (res.status === 500) {
				dispatch({
					type: SIGN_UP_FAILED,
				})
			}
		})
	}
}

export function signInAction({ email, password }) {
	return async dispatch => {
    try {
      const response = await fetch('/oauth/token', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Basic d2ViX2FwcDpjaGFuZ2VpdA==',
        },
        method: 'POST',
        body: `grant_type=password&username=${email}&password=${password}`,
      })
      const data = await response.json()
      sessionStorage.setItem('token', data.access_token)
      sessionStorage.setItem('refresh_token', data.refresh_token)
      const tokenExpireTime = Date.now() + data.expires_in * 1000
      sessionStorage.setItem('tet', tokenExpireTime.toString())
      const payload = jwtDecode(data.access_token)
      dispatch({type: AUTHENTICATED, payload})
    } catch (error) {
      return dispatch({type: AUTHENTICATION_ERROR, message: 'Invalid email or password'})
    }

    try {
      const token = sessionStorage.getItem('token')
      const response = await fetch('/api/account', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      
      const data = await response.json()
      dispatch({type: GET_CURRENT_USER_DATA_SUCCESSFUL, data})
      return dispatch(push('/test'))
    } catch (error) {
      return dispatch({type: GET_CURRENT_USER_DATA_FAIL, message: 'Network error.'})
    }
  }
}

export const GET_CURRENT_USER_RESULT_SUCCESSFUL = 'GET_CURRENT_USER_RESULT_SUCCESSFUL'
export const GET_CURRENT_USER_RESULT_FAIL = 'GET_CURRENT_USER_RESULT_FAIL'

export function getResult() {
  return async (dispatch) => {
    const token = sessionStorage.getItem('token')
    const response = await fetch('/api/account/result', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    })
    if (response.status === 201) {
      const data = response.json();
      dispatch({ type: GET_CURRENT_USER_RESULT_SUCCESSFUL, payload: data, })
    }
    if (response.status === 500) {
      dispatch({ type: GET_CURRENT_USER_RESULT_FAIL, message: 'Something wrong in the connection' })
    }
  }
}
