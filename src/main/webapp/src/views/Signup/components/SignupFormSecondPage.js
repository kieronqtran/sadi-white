import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
import renderField from './renderField'
import CustomButton from '../../../elements/CustomButton/CustomButton'

const SignupFormSecondPage = props => {
  const { handleSubmit, previousPage } = props
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="password"
        type="password"
        component={renderField}
        label="Enter Password"
      />
      <Field
        name="reenter_password"
        type="password"
        component={renderField}
        label="Re-Enter password"
      />
      <Row>
        <Col mdPull={12}>
          <CustomButton fill onClick={previousPage}>
            Previous
          </CustomButton>
          <CustomButton fill pullRight bsStyle="primary" onClick={handleSubmit}>
            Next
          </CustomButton>
        </Col>
      </Row>
    </form>
  )
}

export default reduxForm({
  form: 'signup', //Form name is same
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate,
})(SignupFormSecondPage)
