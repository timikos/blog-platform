import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { IFormInputSignIn } from '../../interfaces'
import { inputsSignIn } from '../../models/form-inputs'
import { login } from '../../redux/slugAction'
import { signInFetch } from '../../apis/api'

import './SignIn.scss'

const SignIn: React.FC = () => {
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors } } = useForm<any>()
  const onSubmit: SubmitHandler<IFormInputSignIn> = async data => {
    try {
      const response = await signInFetch(data)
      localStorage.setItem('token', response.data.user.token)
      localStorage.setItem('avatar', response.data.user.image)
      dispatch(login(response.data.user.username, response.data.user.email))
      navigate('/')
      document.location.reload()
    } catch (e) {
      setError(e)
      setTimeout(() => {
        setError(null)
      }, 3000)
    }
  }

  const inputs = inputsSignIn.map((elem, index) => {
    return (
      <div key={index}>
        <label>{elem.label}</label>
        <input
          type={elem.type}
          {...register(`${elem.inputName}`, {
            required: elem.required,
            pattern: elem.pattern,
          })}
        />
        {errors[elem.errorName] && <p className="sign-up__error">{errors[elem.errorName].message}</p>}
      </div>
    )
  })
  return (
    <section className="sign-in__container">
      {error
        ? <div className="alert alert-danger edit-profile__danger" role="alert">
          Email or password is invalid
        </div>
        : null}
      <form onSubmit={handleSubmit(onSubmit)} className="sign-in__form">
        <h4 className="sign-in__name">Sign In</h4>
        {inputs}
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
