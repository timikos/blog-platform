import React from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { Link } from 'react-router-dom'

import './SignIn.scss'

interface IFormInput {
  emailAddress: string;
  password: string;
}

const SignIn: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>()
  const onSubmit: SubmitHandler<IFormInput> = data => console.log(data)

  return (
    <section className="sign-in__container">
      <form onSubmit={handleSubmit(onSubmit)} className="sign-in__form">
        <h4 className="sign-in__name">Sign In</h4>
        <div>
          <label>Email address</label>
          <input {...register('emailAddress', { required: true, maxLength: 20 })} />
          <ErrorMessage
            errors={errors}
            name="emailAddress"
            render={() => <p className="sign-in__error">Not a format</p>}
          />
        </div>
        <div>
          <label>Password</label>
          <input {...register('password', {
            required: true,
            maxLength: 40,
            minLength: 6,
          })}
          />
          <ErrorMessage
            errors={errors}
            name="password"
            render={() => <p className="sign-in__error">Wrong</p>}
          />
        </div>
        <input
          type="submit"
          value="Login"
          className="sign-in__submit"
        />

        <p className="sign_in__footer-text">Dont have an account? <Link to="/sign-up">Sign Up.</Link></p>
      </form>
    </section>
  )
}

export default SignIn
