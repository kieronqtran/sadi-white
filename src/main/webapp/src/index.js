import React from 'react'
import ReactDOM from 'react-dom'
import 'whatwg-fetch' // add polyfill

import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter, routerMiddleware, push } from 'react-router-redux'
import createHistory from 'history/createHashHistory'

import App from './containers/App/App'

import './assets/css/bootstrap.min.css'
import './assets/css/animate.min.css'
import './assets/sass/light-bootstrap-dashboard.css'
import './assets/css/demo.css'
import './assets/css/pe-icon-7-stroke.css'

import { signUp, GET_CURRENT_USER_DATA_SUCCESSFUL } from 'actions/authentication-actions'

import { createStore, applyMiddleware } from 'redux'

import combinedReducer from './reducers'

import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { AUTHENTICATED, UNAUTHENTICATED, GET_CURRENT_USER_DATA_FAIL, refreshToken } from './actions/authentication-actions'
import jwtDecode from 'jwt-decode'

const history = createHistory({
	hashType: 'hashbang'
})

const reduxRouter = routerMiddleware(history)

const store = createStore(
  combinedReducer,
  composeWithDevTools(applyMiddleware(thunk, reduxRouter)),
)



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

// Login init if
// const token = sessionStorage.getItem('token')
// const refresh_token = sessionStorage.getItem('refresh_token')
// const experied = +sessionStorage.getItem('tet') || 0

const token = getCookie('token')
const refresh_token = getCookie('refresh_token')

if (token && refresh_token ) {    //&& Date.now() < experied
  store.dispatch(refreshToken())
  .then(() => {
    const newToken = getCookie('token')
    return fetch('/api/account', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${newToken}`,
      },
    })
  })
  .then(response => response.json())
  .then((data) => {
    if(!data.error) {
      const payload = jwtDecode(getCookie('token'))

      // const payload = jwtDecode(sessionStorage.getItem('token'))
      store.dispatch({ type: AUTHENTICATED, payload: payload })
      store.dispatch({ type: GET_CURRENT_USER_DATA_SUCCESSFUL, data })
      store.dispatch(push('/user'))
    } else {
      store.dispatch({ type: UNAUTHENTICATED })
      store.dispatch({ type: GET_CURRENT_USER_DATA_FAIL, message: 'Required Login' })
      store.dispatch(push('/login'))
    }
  })
}

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" name="Home" component={App} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
)
