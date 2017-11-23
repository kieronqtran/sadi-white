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
        name="firstName"
        type="text"
        component={renderField}
        label="First Name"
      />
      <Field
        name="lastName"
        type="text"
        component={renderField}
        label="Last Name"
      />
      <Field
        name="phone"
        type="text"
        component={renderField}
        label="Phone Number"
      />
      <Row>
        <Col mdPull={12}>
          <CustomButton fill onClick={previousPage}>
            Previous
          </CustomButton>
          <CustomButton fill pullRight bsStyle="success" onClick={handleSubmit}>
            Submit
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
  validate
})(SignupFormSecondPage)