const validate = values => {
  const errors = {}
  if (!values.firstName) {
    errors.firstName = 'Required'
  }
  if (!values.lastName) {
    errors.lastName = 'Required'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.password) {
    errors.password = 'Required'
  }
  if (!values.reenter_password) {
    errors.reenter_password = 'Required'
  } else if (values.password !== values.reenter_password) {
    errors.reenter_password = 'Reentered password is not match'
  }
  // if(!values.phone) {
  //   errors.phone = 'Required'
  // } else if (!/^[0-9]$/i.test(values.phone)) {
  //   errors.phone = 'Invalid phone format'
  // }
  return errors
}

export default validate
