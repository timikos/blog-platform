import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

import { IFormInputEdit, IStateIsLogged } from '../../interfaces'
import { RootState } from '../../redux/store'
import { editProfilePutFetch } from '../../apis/api'

import './EditProfile.scss'

const EditProfile: React.FC = () => {
  const state: IStateIsLogged = useSelector((state: RootState) => ({
    accountName: state.slugReducer.accountName,
    accountEmail: state.slugReducer.accountEmail,
  }))
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const {
    register, handleSubmit, formState: { errors }
  } = useForm<IFormInputEdit>()
  const onSubmit: SubmitHandler<IFormInputEdit> = async data => {
    setError(null)
    try {
      await editProfilePutFetch(data, state)
      data.avatar ? localStorage.setItem('avatar', data.avatar) : null
      navigate('/')
      document.location.reload()
    } catch (e) {
      setError(e)
    }
  }

  return (
    <section className="edit-profile__container">
      {error
        ? <div className="alert alert-danger edit-profile__danger" role="alert">
            Login or email is busy
        </div>
        : null}
      <form onSubmit={handleSubmit(onSubmit)} className="edit-profile__form">
        <h4 className="edit-profile__name">Edit profile</h4>
        <div>
          <label>Username</label>
          <input
            defaultValue={state.accountName}
            {...register('firstName', {
              required: false,
              minLength: 3,
              maxLength: 20,
              pattern: {
                value: /[A-Za-z]{3}/,
                message: 'Wrong symbols'
              },
            })}
          />
          {errors.firstName && <p className="edit-profile__error">{errors.firstName.message}</p>}
        </div>
        <div>
          <label>Email address</label>
          <input
            type="email"
            defaultValue={state.accountEmail}
            {...register('emailAddress', {
              required: false,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'invalid email address'
              }
            })}
          />
          {errors.emailAddress && <p className="edit-profile__error">{errors.emailAddress.message}</p>}
        </div>
        <div>
          <label>New password</label>
          <input
            type="password"
            {...register('password', {
              maxLength: 40,
              required: false,
              minLength: {
                value: 6,
                message: 'Password must have at least 6 characters'
              }
            })
            }
          />
          {errors.password && <p className="edit-profile__error">{errors.password.message}</p>}
        </div>
        <div>
          <label>Avatar image (url)</label>
          <input {...register('avatar', {
            required: false,
          })}
          />
        </div>
        <input
          type="submit"
          value="Save"
          className="edit-profile__submit"
        />
      </form>
    </section>
  )
}

export default EditProfile
