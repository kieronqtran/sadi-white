import React, { Component } from 'react'
import PropTypes from 'prop-types'
import renderTextField from './renderField'
import validate from './validate'

import Button from '../../../elements/CustomButton/CustomButton';
import { Field, reduxForm } from 'redux-form'

class LoginForm extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <Field
          ncols = {["col-md-12"]}
          name="email"
          component={renderTextField}
          label="Email"
          bsClass="form-control"
          placeholder="Email"
        />
        <Field
          ncols={["col-md-12"]}
          name="password"
          component={renderTextField}
          type="password"
          label="Password"
          placeholder="Password"
          bsClass="form-control"
        />
        <Button
          bsStyle="primary"
          pullRight
          fill
          type="submit"
        >
          Sign In
        </Button>
        <div className="clearfix"></div>
      </form>
    )
  }
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'login',
})(LoginForm);