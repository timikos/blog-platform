import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { logout } from '../../redux/slugAction'
import { RootState } from '../../redux/store'
import { IStateIsLogged } from '../../interfaces'

import './Navbar.scss'

const Navbar: React.FC = () => {
  const state: IStateIsLogged = useSelector((state: RootState) => ({
    accountName: state.slugReducer.accountName,
    accountEmail: state.slugReducer.accountEmail,
  }))
  const dispatch = useDispatch()
  const logoutHandler = () => {
    dispatch(logout())
    localStorage.removeItem('token')
    localStorage.removeItem('avatar')
  }
  return (
    <section className="navbar">
      <Link to="/">
        <p className="navbar__logo">Realworld Blog</p>
      </Link>
      {!localStorage.getItem('token')
        && <div className="navbar__btn d-grid gap-2 d-md-flex justify-content-md-end">
          <Link to="sign-in">
            <button className="btn me-md-2" type="button">Sign In</button>
          </Link>
          <Link to="sign-up">
            <button type="button" className="btn btn-outline-success">Sign Up</button>
          </Link>
        </div>}
      {localStorage.getItem('token')
        && <div className="navbar__btn d-grid gap-2 d-md-flex justify-content-md-end">
          <Link to="articles/new-article">
            <button
              className="btn btn-outline-success navbar__btn-create"
              type="button"
            >
              Create article
            </button>
          </Link>
          <Link to="edit-profile">
            <div className="navbar__profile-container">
              <p className="navbar__profile-name">{state.accountName}</p>
              <img
                className="navbar__profile-avatar"
                alt="avatar"
                src={localStorage.getItem('avatar')!}
              />
            </div>
          </Link>
          <Link to="/">
            <button
              className="btn btn-outline-secondary navbar__btn-logout"
              type="button"
              onClick={logoutHandler}
            >Log Out</button>
          </Link>
        </div>}
    </section>
  )
}

export default Navbar
