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

const renderAccounts = ({ fields, meta: { error, submitFailed } }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push({})}>
        Add bank account
      </button>
      {submitFailed && error && <span>{error}</span>}
    </li>
    {fields.map((account, index) => (
      <li key={index}>
        <button
          type="button"
          title="Remove account"
          onClick={() => fields.remove(index)}
        />
        <h4>Account #{index + 1}</h4>
        <Field
          name={`${account}.IBAN`}
          type="text"
          component={renderField}
          label="IBAN"
        />
        <Field
          name={`${account}.bankName`}
          type="text"
          component={renderField}
          label="Bank name"
        />
      </li>
    ))}
  </ul>
)

const validate = values => {
  console.log('validate', values)
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
      <h3>Bank accounts</h3>
      <FieldArray name="accounts" component={renderAccounts} />
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