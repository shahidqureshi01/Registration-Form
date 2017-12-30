import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'


const renderAccounts = ({ fields, meta: { asyncValidating, error, submitFailed } }) => (
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

export default renderAccounts