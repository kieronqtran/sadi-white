import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'

import Sidebar from 'components/Sidebar/Sidebar'
import { style } from 'variables/Variables'
import appRoutes from 'routes/app'
import Header from '../../components/Header/Header'
import { refreshToken, getIsLoggedIn } from "../../actions/authentication-actions";

const PrivateRoute = ({ component: Component, isAuthenticated, redirectPath,...rest }) => (
  <Route {...rest} render={props => (
    isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: redirectPath,
        state: { from: props.location }
      }}/>
    )
  )}/>
)

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
              if (prop.redirect){
                return <Redirect from={prop.path} to={prop.to} key={key} />
              }
              if (prop.requiredLogin && !this.props.isAuthenticated){
                return <PrivateRoute isAuthenticated={false} redirectPath={"/login"} component={prop.component}/>
              }
              // if (prop.cannotGetBack && this.props.isLoggedIn==0){
              //   return <PrivateRoute isAuthenticated={false} redirectPath={"/user"} component={prop.component}/>
              // }
              else{
                  return (
                    <Route path={prop.path} component={prop.component} key={key} />
                  )
              }
            })}
          </Switch>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isAdmin: state.auth.isAdmin,
    isLoggedIn: state.user.userProfile.id,
  }
}

export default connect(mapStateToProps, { refreshToken, getIsLoggedIn })(App)
