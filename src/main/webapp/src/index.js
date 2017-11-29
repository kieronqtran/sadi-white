import React from 'react';
import ReactDOM from 'react-dom';

import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import App from './containers/App/App';

import './assets/css/bootstrap.min.css';
import './assets/css/animate.min.css';
import './assets/sass/light-bootstrap-dashboard.css';
import './assets/css/demo.css';
import './assets/css/pe-icon-7-stroke.css';

import { signUp } from 'actions/authentication-actions';
import { createStore, applyMiddleware } from 'redux';
import combinedReducer from './reducers/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { AUTHENTICATED } from './actions/authentication-actions';
import jwtDecode from 'jwt-decode';

let store = createStore(
  combinedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

const token = sessionStorage.getItem('token');

if (token) {
  const payload = jwtDecode(token);
  store.dispatch({ type: AUTHENTICATED, payload: payload });
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <App signUp={info => store.dispatch(signUp(info))} />
        <Route path="/" name="Home" component={App} />

      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
