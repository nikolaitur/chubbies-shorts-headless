import * as yup from 'yup'

export const EMAIL_GENERIC_VALIDATION = yup
  .string()
  .email('Please enter a valid email')
  .required('This field is required')

export const PASSWORD_GENERIC_VALIDATION = yup.string().required('This field is required')

export const AUTH_VALIDATION_SCHEMA = yup.object().shape({
  email: EMAIL_GENERIC_VALIDATION,
  password: PASSWORD_GENERIC_VALIDATION,
})
