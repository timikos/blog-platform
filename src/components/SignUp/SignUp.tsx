import React, { useState } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { Checkbox } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import './SignUp.scss'
import { IFormInputSignUp, IResponseAccount } from '../../interfaces'

const SignUp: React.FC = () => {
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const {
    register, control, handleSubmit, watch, formState: { errors }
  } = useForm<IFormInputSignUp>()
  const onSubmit: SubmitHandler<IFormInputSignUp> = data => {
    setError(null)
    axios.post<IResponseAccount>('https://kata.academy:8021/api/users', {
      user: {
        username: data.firstName,
        email: data.emailAddress,
        password: data.password,
        image: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/No_image.JPG'
      }
    })
      .then(() => {
        navigate('/sign-in')
      })
      .catch(e => {
        setError(e)
        setTimeout(() => {
          setError(null)
        }, 3000)
      })
  }
  return (
    <section className="sign-up__container">
      {error
        ? <div className="alert alert-danger sign-up__danger" role="alert">
          Login or email is busy
        </div>
        : null}
      <form onSubmit={handleSubmit(onSubmit)} className="sign-up__form">
        <h4 className="sign-up__name">Create new account</h4>
        <div>
          <label>Username</label>
          <input {...register('firstName', {
            required: 'Login is required',
            minLength: 3,
            maxLength: 20,
            pattern: {
              value: /[A-Za-z]{3}/,
              message: 'Wrong symbols'
            },
          })}
          />
          {errors.firstName && <p className="sign-up__error">{errors.firstName.message}</p>}
        </div>
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
            })}
          />
          {errors.password && <p className="sign-up__error">{errors.password.message}</p>}
        </div>
        <div>
          <label>Repeat password</label>
          <input
            type="password"
            {...register('repeatPassword', {
              required: true,
              maxLength: 40,
              minLength: 6,
              validate: (val: string) => {
                if (watch('password') !== val) {
                  return 'Your passwords do no match'
                }
              }
            })}
          />
          {errors.password && <p className="sign-up__error">{errors.password.message}</p>}
        </div>
        <div className="sign-up__checkbox">
          <Controller
            name="myCheckbox"
            control={control}
            rules={{ required: 'Is required' }}
            render={({ field }) => <Checkbox {...field} />}
          />
          <label>I agree to the processing of my personal information</label>
          {errors.myCheckbox && <p
            className="sign-up__error"
            style={{
              top: '72%',
              left: '68%'
            }}
          >{errors.myCheckbox.message}</p>}
        </div>
        <input
          type="submit"
          value="Create"
          className="sign-up__submit"
        />
        <p className="sign_up__footer-text">Already have an account? <Link to="/sign-in">Sign In.</Link></p>
      </form>
    </section>
  )
}

export default SignUp
