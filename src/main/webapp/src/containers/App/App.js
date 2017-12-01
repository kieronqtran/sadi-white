import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'

import Sidebar from 'components/Sidebar/Sidebar'
import { style } from 'variables/Variables'
import appRoutes from 'routes/app'
import Header from '../../components/Header/Header'
import {refreshToken} from "../../actions/authentication-actions";


class App extends Component {
  constructor(props) {
    super(props)
      const app = this;
      setInterval(function() {
          app.props.refreshToken();
      }, 1200000);
  }

  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf('nav-open') !== -1
    ) {
      document.documentElement.classList.toggle('nav-open')
    }
  }

  render() {
    return (
      <div className="wrapper">
        <Sidebar {...this.props} />
        <div id="main-panel" className="main-panel">
          <Header {...this.props} />
          <Switch>
            {appRoutes.map((prop, key) => {
              if (prop.redirect)
                return <Redirect from={prop.path} to={prop.to} key={key} />
              return (
                <Route path={prop.path} component={prop.component} key={key} />
              )
            })}
          </Switch>
        </div>
      </div>
    )
  }
}

function mapStateToProps(centralState) {
  return {
    signUpUser: centralState.userReducer,
    logInUser: centralState.logInReducer,
  }
}

export default connect(mapStateToProps, { refreshToken })(App)
