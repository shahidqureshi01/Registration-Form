import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)

const validate = values => {
  const errors = {}
  if (!values.firstName) {
    errors.firstName = 'First name Required'
  } else if (!/^[a-zA-Z]*$/g.test(values.firstName)) {
    errors.firstName = 'Only characters are allowed'
  }
  if (!values.lastName) {
    errors.lastName = 'Last name is Required'
  } else if (!/^[A-Z]*$/i.test(values.lastName)) {
    errors.firstName = 'Only characters are allowed'
  }
  if (!values.email) {
    errors.email = 'Email is Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  return errors
}

const Form = (props) => {
  console.log('propsy', props)
  const { handleSubmit, pristine, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <h2>Register Account</h2>
      <Field name="firstName" type="text" component={renderField} label="First Name"/>
      <Field name="lastName" type="text" component={renderField} label="Last Name"/>
      <Field name="email" type="email" component={renderField} label="Email"/>
      <div>
        <button type="submit" disabled={submitting}>Submit</button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'Form', 
  validate,     
})(Form)