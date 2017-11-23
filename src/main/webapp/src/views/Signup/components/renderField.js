import React from 'react'
import {FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap'

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <FormGroup>
    <ControlLabel>{label}</ControlLabel>
    <FormControl {...input} placeholder={label} type={type} />
    <FormControl.Feedback />
    {touched && error &&
    <HelpBlock>{error}</HelpBlock>}
  </FormGroup>
)

export default renderField