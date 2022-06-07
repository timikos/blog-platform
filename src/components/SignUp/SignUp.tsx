import React from "react";
import ReactDOM from "react-dom";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { Checkbox } from "@mui/material";

import './SignUp.scss'
import { Link } from 'react-router-dom'

interface IFormInput {
  firstName: String;
  emailAddress: String;
  password: String;
  repeatPassword: String;
  exampleRequired: string;
}

const SignUp = () => {
  const { register, control, handleSubmit, formState: { errors } } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = data => console.log(data);

  return (
    <section className="sign-up__container">
      <form onSubmit={handleSubmit(onSubmit)} className="sign-up__form">
        <h4 className="sign-up__name">Create new account</h4>
        <div>
          <label>Username</label>
          <input {...register("firstName", {
            required: true,
            maxLength: 20,
            pattern: {
              value: /[A-Za-z]{3}/,
              message: 'error message'
            },
            minLength: 3})} />
          <ErrorMessage
            errors={errors}
            name="firstName"
            render={({ message }) => <p className="sign-up__error">Short username</p>}
          />
        </div>
        <div>
          <label>Email address</label>
          <input {...register("emailAddress", { required: true, maxLength: 20 })} />
          <ErrorMessage
            errors={errors}
            name="emailAddress"
            render={({ message }) => <p className="sign-up__error">Not a format</p>}
          />
        </div>
        <div>
          <label>Password</label>
          <input {...register("password", {
            required: true,
            maxLength: 40,
            minLength: 6,
          })} />
          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) => <p className="sign-up__error">Wrong</p>}
          />
        </div>
        <div>
          <label>Repeat password</label>
          <input {...register("repeatPassword", {
            required: true,
            maxLength: 40,
            minLength: 6
          })} />
          <ErrorMessage
            errors={errors}
            name="repeatPassword"
            render={({ message }) => <p className="sign-up__error">Wrong</p>}
          />
        </div>
        <div className="sign-up__checkbox">
          <Controller
            name="MyCheckbox"
            control={control}
            defaultValue={false}
            rules={{ required: true }}
            render={({ field }) => <Checkbox {...field} />}
          />
          <label>I agree to the processing of my personal information</label>
          <ErrorMessage
            errors={errors}
            name="MyCheckbox"
            render={({ message }) => <p className="sign-up__error" style={{top: '570px', left: '650px'}}>Need to agree</p>}
          />
        </div>
        <input
          type="submit"
          value="Create"
          className="sign-up__submit"
        />

        <p className="sign_up__footer-text">Already have an account? <Link to="/sign-in" >Sign In.</Link></p>
      </form>
    </section>
  )
}

export default SignUp
