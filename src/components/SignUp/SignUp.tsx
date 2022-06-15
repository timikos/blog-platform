import React, { useState } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { Checkbox } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'

import { IFormInputSignUpSubmit } from '../../interfaces'
import { inputsSignUp } from '../../models/form-inputs'
import { signUpFetch } from '../../apis/api'

import './SignUp.scss'

const SignUp: React.FC = () => {
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const {
    register, control, handleSubmit, watch, formState: { errors }
  } = useForm<any>()
  const onSubmit: SubmitHandler<IFormInputSignUpSubmit> = async data => {
    setError(null)
    try {
      await signUpFetch(data)
      navigate('/sign-in')
    } catch (e) {
      setError(e)
      setTimeout(() => {
        setError(null)
      }, 3000)
    }
  }

  const inputs = inputsSignUp.map((elem, index) => {
    return (
      <div key={index}>
        <label>{elem.label}</label>
        <input
          type={elem.type}
          {...register(`${elem.inputName}`, {
            required: elem.required,
            minLength: elem.minLength,
            maxLength: elem.maxLength,
            pattern: elem.pattern,
            validate:
              elem.inputName === 'repeatPassword'
                ? (val: string) => {
                  if (watch('password') !== val) {
                    return 'Your passwords do no match'
                  }
                }
                : {}
          })}
        />
        {errors[elem.errorName] && <p className="sign-up__error">{errors[elem.errorName].message}</p>}
      </div>
    )
  })
  return (
    <section className="sign-up__container">
      {error
        ? <div className="alert alert-danger sign-up__danger" role="alert">
          Login or email is busy
        </div>
        : null}
      <form onSubmit={handleSubmit(onSubmit)} className="sign-up__form">
        <h4 className="sign-up__name">Create new account</h4>
        {inputs}
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
