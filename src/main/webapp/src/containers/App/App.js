import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'

import Sidebar from 'components/Sidebar/Sidebar'
import { style } from 'variables/Variables'
import appRoutes from 'routes/app'
import Header from '../../components/Header/Header'
import { refreshToken } from "../../actions/authentication-actions";

const PrivateRoute = ({ component: Component, isAuthenticated, redirectPath, ...rest }) => (
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
    setInterval(() => {
        app.props.refreshToken();
    }, 120000);
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
  }
}

export default connect(mapStateToProps, { refreshToken })(App)
