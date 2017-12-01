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
			const data  = await response.json()
			sessionStorage.setItem('token', data.access_token)
			sessionStorage.setItem('refresh_token', data.refresh_token)
      const tokenExpireTime = Date.now() + data.expires_in * 1000
      sessionStorage.setItem('tet', tokenExpireTime.toString())
			const payload = jwtDecode(data.access_token)
			dispatch({ type: AUTHENTICATED, payload })
		} catch (error) {
			return dispatch({ type: AUTHENTICATION_ERROR, message: 'Invalid email or password' })
    }

    try {
      const token =  sessionStorage.getItem('token')
      const response = await fetch('/api/account', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()
      dispatch({ type: GET_CURRENT_USER_DATA_SUCCESSFUL, data })
      return dispatch(push('/test'))
    } catch (error) {
      return dispatch({ type: GET_CURRENT_USER_DATA_FAIL, message: 'Network error.'})
    }
    return dispatch({ type: GET_CURRENT_USER_DATA_FAIL, message: 'Require user logged in.' })
  }
}

<<<<<<< HEAD
=======
    export function signInAction({email, password}) {
        return async dispatch => {
            fetch('/oauth/token', {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: 'Basic d2ViX2FwcDpjaGFuZ2VpdA==',
                },
                method: 'POST',
                body: `grant_type=password&username=${email}&password=${password}`,
            })
            .then(res => res.json())
            .then(res => {
                    try {
                        sessionStorage.setItem('token', res.access_token)
                        sessionStorage.setItem('refresh_token', res.refresh_token)
                        const payload = jwtDecode(res.access_token)
                        dispatch({type: AUTHENTICATED, payload})
                    } catch (error) {
                        dispatch({
                            type: AUTHENTICATION_ERROR,
                            payload: 'Invalid email or password',
                        })
                    }
                })
            .then(() => {
                    const token = sessionStorage.getItem('token');
                    fetch('/api/account', {
                        method: 'GET',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    })
                        .then(res => res.json())
                        .then(res =>
                            dispatch({
                                type: 'USER_INFO',
                                user: res,
                            }),
                        )
                        .then(res => {
                            if (res) {
                                redirect: window.location.assign('http://localhost:3000/#/user')
                            }
                            document.getElementById('User Account').style.display = 'inline'
                            document.getElementById('Login').style.display = 'none'
                            document.getElementById('Signup').style.display = 'none'
                        })
                })
                .then(() =>{
                    const token = sessionStorage.getItem('token');
                    fetch('/api/result', {
                        method: 'GET',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    })
                        .then(res => res.json())
                        .then(res =>
                            dispatch({
                                type: 'USER_RESULT',
                                result: res
                            }),
                        )
                })
        }
}
>>>>>>> 9e32a7983bbe0a2ae27f0c811ff86f5f6ad5b6fa
