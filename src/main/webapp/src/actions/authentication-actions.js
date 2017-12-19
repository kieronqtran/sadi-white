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

export const GET_RESULT_SUCCESSFUL = 'GET_RESULT_SUCCESSFUL'
export const GET_RESULT_ERROR = 'GET_RESULT_ERROR'


export const GET_ALL_RESULT_SUCCESSFUL = 'GET_ALL_RESULT_SUCCESSFUL'
export const GET_ALL_RESULT_ERROR = 'GET_ALL_RESULT_ERROR'

export const GET_ALL_ACCOUNT_SUCCESSFULL = 'GET_ALL_ACCOUNT_SUCCESSFULL'
export const GET_ALL_ACCOUNT_ERROR = 'GET_ALL_ACCOUNT_ERROR'

export const DELETE_ACCOUNT_SUCCESSFULL = 'DELETE_ACCOUNT_SUCCESSFULL'
export const DELETE_ACCOUNT_ERROR = 'DELETE_ACCOUNT_ERROR'

function setCookie(cname,cvalue,extime){
  var d = new Date();
  d.setTime(d.getTime()+(extime*1000));
  var expire = "expires=" + d.toUTCString();
  document.cookie = cname +"=" + cvalue + ";" + expire + ";path=/";
}

function getCookie(cname){
  var name = cname + "=";
  var decodedCookie= decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i=0; i<ca.length; i++){
    var c = ca[i];
    while (c.charAt(0) == ' '){
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0){
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function deleteCookie(cname){
  setCookie(cname,"",-1);
}


export function refreshToken() {
	return async dispatch => {
	  const refresh_token = getCookie('refresh_token')

		// const refresh_token = sessionStorage.getItem('refresh_token')
		if (refresh_token) {
			fetch('/oauth/token', {
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/x-www-form-urlencoded',
					Authorization: 'Basic d2ViX2FwcDpjaGFuZ2VpdA==',
				},
				method: 'POST',
        body: `grant_type=refresh_token&refresh_token=${getCookie('refresh_token')}`,
        // body: `grant_type=refresh_token&refresh_token=${sessionStorage.getItem('refresh_token')}`,
			})
				.then(res => res.json())
				.then(res => {
          setCookie('token', res.access_token, res.expires_in)
          setCookie('refresh_token', res.refresh_token, res.expires_in)

					// sessionStorage.setItem('token', res.access_token)
          // sessionStorage.setItem('refresh_token', res.refresh_token)
          // const tokenExpireTime = Date.now() + res.expires_in * 1000
          // sessionStorage.setItem('tet', tokenExpireTime.toString())

          const payload = jwtDecode(res.access_token)
					dispatch({ type: REFRESH_TOKEN, payload })
				})
		}

	}
}

export function logOut() {
  return async dispatch => {
    deleteCookie('token')
    deleteCookie('refresh_token')

    // sessionStorage.removeItem('token')
    // sessionStorage.removeItem('refresh_token')
    dispatch({type: UNAUTHENTICATED })
  }
}

export function updateInfo(info) {
  return async dispatch => {
    try {
      const token =  getCookie('token')

      // const token =  sessionStorage.getItem('token')
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
      window.location.reload(true);
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
        alert("Sign Up succeeded")
        dispatch(push('/login'))

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

      setCookie('token', data.access_token, data.expires_in)
      setCookie('refresh_token', data.refresh_token, data.expires_in)

      // sessionStorage.setItem('token', data.access_token)
      // sessionStorage.setItem('refresh_token', data.refresh_token)

      // const tokenExpireTime = Date.now() + data.expires_in * 1000
      // sessionStorage.setItem('tet', tokenExpireTime.toString())

      const payload = jwtDecode(data.access_token)

      dispatch({type: AUTHENTICATED, payload})
    } catch (error) {
      return dispatch({type: AUTHENTICATION_ERROR, message: 'Invalid email or password'})
    }

    try {
      const token = getCookie('token')

      // const token = sessionStorage.getItem('token')
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

      dispatch(push('/user'))

    } catch (error) {
      return dispatch({type: GET_CURRENT_USER_DATA_FAIL, message: 'Network error.'})
    }
  }
}

export function getResult() {
	return async dispatch => {
    const token =  getCookie('token')

    // const token =  sessionStorage.getItem('token')
      const response = await fetch('/api/result', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()
      dispatch({ type: GET_RESULT_SUCCESSFUL, result: data })
	}
}


export function getAllResult() {
  return async dispatch => {

    const token = getCookie('token')

    // const token =  sessionStorage.getItem('token')

    const response = await fetch('/api/allResults', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await response.json()
    dispatch({ type: GET_ALL_RESULT_SUCCESSFUL, allResults: data })
  }
}

export function getAllAccount() {
  return async dispatch => {

    const token = getCookie('token')

    // const token =  sessionStorage.getItem('token')

    const response = await fetch('/api/allAccounts', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await response.json()
    dispatch({ type: GET_ALL_ACCOUNT_SUCCESSFULL, allAccounts: data })
  }
}

export function deleteAccount(id) {
  return async dispatch => {

    const token = getCookie('token')

    // const token =  sessionStorage.getItem('token')

    const response = await fetch(`/api/account/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    await dispatch(getAllAccount());
    dispatch({ type: DELETE_ACCOUNT_SUCCESSFULL})
  }
}
