import iban from 'iban'

const validate = values => {
  //console.log('validate', values)
  const errors = {}
  if (!values.firstName) {
    errors.firstName = 'First name is Required'
  } else if (!/^[a-zA-Z]*$/g.test(values.firstName)) {
    errors.firstName = 'Only characters are allowed'
  }
  if (!values.lastName) {
    errors.lastName = 'Last name is Required'
  } else if (!/^[a-zA-Z]*$/g.test(values.lastName)) {
    errors.lastName = 'Only characters are allowed'
  }
  if (!values.email) {
    errors.email = 'Email is Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Value should be a valid email'
  }

  if (!values.accounts || !values.accounts.length) {
    errors.accounts = {_error: 'You should provide at least one bank account'}
  } else {
    const accountsArrayErrors = []
    values.accounts.forEach((account, accountIndex) => {
      console.log('errors', account)
      const accountErrors = {}
      if (!account || !account.IBAN) {
        accountErrors.IBAN = 'IBAN is Required'
        accountsArrayErrors[accountIndex] = accountErrors
      } else if(!iban.isValid(account.IBAN)) {
        accountErrors.IBAN = 'IBAN is invalid'
        accountsArrayErrors[accountIndex] = accountErrors
      }
      if(!account.bankName){
        accountErrors.bankName = 'bank Name is required'
        accountsArrayErrors[accountIndex] = accountErrors
      }
    })
    if (accountsArrayErrors.length) {
      errors.accounts = accountsArrayErrors
    }
  }
  return errors
}

export default validate
