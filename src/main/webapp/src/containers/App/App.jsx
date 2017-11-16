import React, { Component } from 'react';
import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

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

    startSignup(info){
        alert(info.firstname + " - " + info.lastname + " - " +
            info.email + " - " + info.password);
    }

    render() {
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
                                                            handleSignup={(info) => this.startSignup(info)}
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

export default App;
