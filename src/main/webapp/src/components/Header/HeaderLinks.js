import React, { Component } from 'react'
import { NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap'
import { connect } from 'react-redux'
import { push } from "react-router-redux";
import { logOut } from '../../actions/authentication-actions'

class HeaderLinks extends Component {

  handleRoute(route) {
    this.props.push(route)
  }

  handleLogout() {
    this.props.logOut();
    this.props.push('/login');
  }

  render() {
    return (this.props.isAuthenticated ?
            (<Nav pullRight>
              <NavItem eventKey={2} onClick={(e) => this.handleRoute('/user')}>
                Hello {this.props.userFullName}
              </NavItem>
              <NavItem eventKey={3} onClick={(e) => this.handleLogout()}>
                Log out
              </NavItem>
            </Nav>) :
            (<Nav pullRight>
              <NavItem eventKey={3} onClick={(e) => this.handleRoute('/login')}>Log in</NavItem>
            </Nav>)
        )
  }
}

function mapStateToProps(state) {
  return {
    userFullName: `${state.user.userProfile.firstName} ${state.user.userProfile.lastName}`,
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps, { logOut, push })(HeaderLinks)
