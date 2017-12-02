import React from 'react'
import { Row, Col } from 'react-bootstrap'

import { Field, reduxForm } from 'redux-form'
import renderField from './components/renderField.js'
import CustomButton from 'elements/CustomButton/CustomButton'
import { connect } from 'react-redux'
import validate from './components/validate.js'


const UserProfile = props => {
  const { handleSubmit, firstName, lastName, phone } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Row>
        <Col md={6}>
          <Field name="firstName"
                 type="input"
                 component={renderField}
                 label="First Name"
                 defaultValue={firstName}/>
        </Col>
        <Col md={6}>
          <Field name="lastName"
                 type="test"
                 component={renderField}
                 label="Last Name"
                 defaultValue={lastName}/>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Field name="phone"
                 type="test"
                 component={renderField}
                 label="Phone"
                 defaultValue={phone}/>
        </Col>
      </Row>

      <Row>
        <Col mdPull={12}>
          <CustomButton fill pullRight bsStyle="primary" onClick={handleSubmit}>
            Update
          </CustomButton>
        </Col>
      </Row>
    </form>
  )
}

function mapStateToProps(state) {
  return {
    initialValues: state.user.userProfile,
  }
}

export default connect(mapStateToProps)(reduxForm({
  form: 'userProfile',
  validate,
})(UserProfile))
