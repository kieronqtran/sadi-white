import React from 'react'
import { Row, Col } from 'react-bootstrap'

import { Field, reduxForm } from 'redux-form'
import validate from './validate'
import renderField from './renderField'
import CustomButton from '../../../elements/CustomButton/CustomButton'

const SignupFormFirstPage = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={handleSubmit}>
      <Field name="email" type="email" component={renderField} label="Email" />
      <Row>
        <Col mdPull={12}>
          <CustomButton fill pullRight bsStyle="primary" onClick={handleSubmit}>
            Next
          </CustomButton>
        </Col>
      </Row>
    </form>
  )
}

export default reduxForm({
  form: 'signup',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
})(SignupFormFirstPage)