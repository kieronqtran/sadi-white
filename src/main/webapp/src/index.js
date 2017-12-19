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
import docCookies from './helper/cookie'

const history = createHistory({
	hashType: 'hashbang'
})

const reduxRouter = routerMiddleware(history)

const store = createStore(
  combinedReducer,
  composeWithDevTools(applyMiddleware(thunk, reduxRouter)),
)

// Login init if
const token = docCookies.getItem('token')
const refresh_token = docCookies.getItem('refresh_token')

if (token && refresh_token) {
  store.dispatch(refreshToken())
  .then(() => {
    const newToken = docCookies.getItem('token')
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
      const payload = jwtDecode(docCookies.getItem('token'))
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
