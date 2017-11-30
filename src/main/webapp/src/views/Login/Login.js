import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Card } from 'components/Card/Card'
import { StatsCard } from 'components/StatsCard/StatsCard'
import { Tasks } from 'components/Tasks/Tasks'
import { FormInputs } from '../../components/FormInputs/FormInputs'
import { UserCard } from 'components/UserCard/UserCard'
import Button from 'elements/CustomButton/CustomButton'
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
} from 'react-bootstrap'

import { Field, reduxForm, propTypes } from 'redux-form'

import { signInAction } from '../../actions/authentication-actions'
import ReactDOM from 'react-dom'
import LoginForm from './components/LoginForm'

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => {
  let comRef
  return (
    <Row>
      <div className={custom['ncols']}>
        <FormGroup>
          <ControlLabel className="pull-left">{label}</ControlLabel>
          <FormControl {...input} {...custom} />
        </FormGroup>
      </div>
    </Row>
  )
}

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
    }

  }

  submit(values) {
    this.props.signInAction(values)
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row className="login-container">
            <Col md={4}>
              <Card
                title="Login Profile"
                content={
                  <div>
                    <LoginForm onSubmit={this.submit.bind(this)} />
                    {this.errorMessage && (
                      <HelpBlock>this.errorMessage</HelpBlock>
                    )}
                  </div>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    authenticated: state.auth.authenticated,
  }
}

export default withRouter(connect(mapStateToProps, { signInAction })(Login))
