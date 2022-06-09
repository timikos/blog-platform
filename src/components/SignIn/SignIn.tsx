import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import './SignIn.scss'

import { IFormInputSignIn, IResponseAccount } from '../../interfaces'

const SignIn: React.FC = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInputSignIn>()
  const onSubmit: SubmitHandler<IFormInputSignIn> = data => {
    console.log(data)
    axios.post<IResponseAccount>('https://kata.academy:8021/api/users/login', {
      user: {
        email: data.emailAddress,
        password: data.password
      }
    })
      .then(response => {
        localStorage.setItem('token', response.data.user.token)
        localStorage.setItem('username', response.data.user.username)
        localStorage.setItem('email', response.data.user.email)
        localStorage.setItem('avatar', response.data.user.image)
        localStorage.setItem('password', data.password)
      })
      .then(() => {
        navigate('/')
        document.location.reload()
      })
      .catch(e => console.log(e))
  }

  return (
    <section className="sign-in__container">
      <form onSubmit={handleSubmit(onSubmit)} className="sign-in__form">
        <h4 className="sign-in__name">Sign In</h4>
        <div>
          <label>Email address</label>
          <input
            type="email"
            {...register('emailAddress', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'invalid email address'
              }
            })}
          />
          {errors.emailAddress && <p className="sign-up__error">{errors.emailAddress.message}</p>}
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            {...register('password', {
              maxLength: 40,
              required: 'You must specify a password',
              minLength: {
                value: 6,
                message: 'Password must have at least 6 characters'
              }
            })
            }
          />
          {errors.password && <p className="sign-in__error">{errors.password.message}</p>}
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
