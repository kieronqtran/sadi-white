const validate = values => {
  const errors = {}
  if (!values.firstName) {
    errors.firstName = 'Required'
  } else if(values.firstName.length > 50){
    errors.firstName = 'FirstName cannot be longer than 50 characters'
  }
  if (!values.lastName) {
    errors.lastName = 'Required'
  } else if(values.lastName.length > 50){
    errors.lastName = 'LastName cannot be longer than 50 characters'
  }
  if (!values.phone) {
    errors.phone = 'Required'
  } else if (values.phone.length < 10){
    errors.phone = 'Phone cannot be shorter than 10 characters'
  } else if (values.phone.length > 13){
    errors.phone = 'Phone cannot be longer than 13 characters'
  }
  return errors
}

export default validate
