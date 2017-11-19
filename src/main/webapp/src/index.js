import React from 'react';
import ReactDOM from 'react-dom';

import {
    HashRouter,
    Route,
    Switch
} from 'react-router-dom';

import App from 'containers/App/App.jsx';

import './assets/css/bootstrap.min.css';
import './assets/css/animate.min.css';
import './assets/sass/light-bootstrap-dashboard.css';
import './assets/css/demo.css';
import './assets/css/pe-icon-7-stroke.css';

import { signUP } from "actions/order-actions";
// import { dispatch } from 'redux'

import { createStore, applyMiddleware } from 'redux'
import combinedReducer from './reducers/reducers.js'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

let store = createStore(combinedReducer, applyMiddleware(thunk))

ReactDOM.render((

    <HashRouter>
        <Provider store={store}>
        <Switch>
            <App signUp={(info) => store.dispatch(signUP(info))}/>
            <Route path="/" name="Home" component={App}/>
        </Switch>
        </Provider>
    </HashRouter>

),document.getElementById('root'));
