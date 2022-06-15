export const inputsSignUp = [
  {
    label: 'Username',
    type: '',
    inputName: 'firstName',
    required: 'Login is required',
    minLength: 3,
    maxLength: 20,
    pattern: {
      value: /[A-Za-z]{3}/,
      message: 'Wrong symbols'
    },
    errorName: 'firstName'
  },
  {
    label: 'Email address',
    type: 'email',
    inputName: 'emailAddress',
    required: 'Email is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'invalid email address'
    },
    errorName: 'emailAddress'
  },
  {
    label: 'Password',
    type: 'password',
    inputName: 'password',
    required: 'You must specify a password',
    minLength: {
      value: 6,
      message: 'Password must have at least 6 characters'
    },
    errorName: 'password'
  },
  {
    label: 'Repeat password',
    type: 'password',
    inputName: 'repeatPassword',
    required: true,
    maxLength: 40,
    minLength: 6,
    errorName: 'password'
  }
]

export const inputsSignIn = [
  {
    label: 'Email address',
    type: 'email',
    inputName: 'emailAddress',
    required: 'Email is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'invalid email address'
    },
    errorName: 'emailAddress'
  },
  {
    label: 'Password',
    type: 'password',
    inputName: 'password',
    required: 'You must specify a password',
    minLength: {
      value: 6,
      message: 'Password must have at least 6 characters'
    },
    errorName: 'password'
  }
]
