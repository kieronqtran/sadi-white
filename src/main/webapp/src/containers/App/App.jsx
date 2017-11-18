import React, { Component } from 'react';
import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

import { connect } from 'react-redux'

import { signUP } from "../../actions/order-actions";

import Sidebar from 'components/Sidebar/Sidebar';
import {style} from "variables/Variables.jsx";
import appRoutes from 'routes/app.jsx';


class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            _notificationSystem: null
        };
    }


    componentDidUpdate(e){
        if(window.innerWidth < 993 && e.history.location.pathname !== e.location.pathname && document.documentElement.className.indexOf('nav-open') !== -1){
            document.documentElement.classList.toggle('nav-open');
        }
    }

    startLogin(info){
        alert(info.email + " - " + info.password);
    }

    render() {
        const { dispatch } = this.props
        return (
                <div className="wrapper">
                    <Sidebar {...this.props} />
                    <div id="main-panel" className="main-panel">
                            <Switch>
                                {
                                    appRoutes.map((prop,key) => {
                                        if(prop.name === "Login")
                                            return (
                                                <Route
                                                    path={prop.path}
                                                    key={key}
                                                    render={routeProps =>
                                                        <prop.component
                                                            {...routeProps}
                                                            handleLogin={(info) => this.startLogin(info)}
                                                        />}
                                                />
                                            );
                                        if(prop.name === "Signup")
                                            return (
                                                <Route
                                                    path={prop.path}
                                                    key={key}
                                                    render={routeProps =>
                                                        <prop.component
                                                            {...routeProps}
                                                            handleSignup={(info) => dispatch(signUP(info))}
                                                        />}
                                                />
                                            );
                                        if(prop.redirect)
                                            return (
                                                <Redirect from={prop.path} to={prop.to} key={key}/>
                                            );
                                        return (
                                            <Route path={prop.path} component={prop.component} key={key}/>
                                        );
                                    })
                                }
                            </Switch>
                    </div>
                </div>
        );
    }
}

function mapStateToProps(centralState) {
    return {
        signUpUser: centralState.userReducer
    }
}

export default connect(mapStateToProps)(App);
