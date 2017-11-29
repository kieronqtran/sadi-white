import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import HeaderLinks from '../Header/HeaderLinks'

import imagine from '../../assets/img/sidebar-3.jpg'
import logo from '../../assets/img/reactlogo.png'

import appRoutes from '../../routes/app'

class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      width: window.innerWidth,
    }
  }
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? 'active' : ''
  }
  updateDimensions() {
    this.setState({ width: window.innerWidth })
  }
  componentDidMount() {
    this.updateDimensions()
    window.addEventListener('resize', this.updateDimensions.bind(this))
  }
  render() {
    return (
      <div id="sidebar" className="sidebar" data-color="black">
        <div className="logo">
          <a href="/" className="simple-text logo-normal">
            SADI - Assignment 1
          </a>
        </div>
        <div className="sidebar-wrapper">
          <ul className="nav">
            {this.state.width <= 991 ? <HeaderLinks /> : null}
            {appRoutes.map((prop, key) => {
              if (!prop.redirect && prop.name != 'User Account')
                return (
                  <li
                    className={
                      prop.upgrade
                        ? 'active active-pro'
                        : this.activeRoute(prop.path)
                    }
                    key={key}
                    id={prop.name}
                  >
                    <NavLink
                      to={prop.path}
                      className="nav-link"
                      activeClassName="active"
                    >
                      <i className={prop.icon} />
                      <p>{prop.name}</p>
                    </NavLink>
                  </li>
                )
              if (!prop.redirect && prop.name == 'User Account')
                return (
                  <li
                    style={{ display: 'none' }}
                    className={
                      prop.upgrade
                        ? 'active active-pro'
                        : this.activeRoute(prop.path)
                    }
                    key={key}
                    id={prop.name}
                  >
                    <NavLink
                      to={prop.path}
                      className="nav-link"
                      activeClassName="active"
                    >
                      <i className={prop.icon} />
                      <p>{prop.name}</p>
                    </NavLink>
                  </li>
                )
              return null
            })}
          </ul>
        </div>
      </div>
    )
  }
}

export default Sidebar
