import React from 'react'
import './Navbar.scss'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { logout } from '../../redux/slugAction'
import { RootState } from '../../redux/store'

const Navbar: React.FC = () => {
  const state = useSelector((state: RootState) => ({
    isLogged: state.slugReducer.isLogged,
  }))
  const dispatch = useDispatch()
  const logoutHandler = () => {
    dispatch(logout())
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('avatar')
    localStorage.removeItem('email')
    localStorage.removeItem('password')
  }
  const urlTmpPic = "data:image/jpeg;base64,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"
  return (
    <section className="navbar">
      <Link to="/">
        <p className="navbar__logo">Realworld Blog</p>
      </Link>
      {!state.isLogged
        && <div className="navbar__btn d-grid gap-2 d-md-flex justify-content-md-end">
          <Link to="sign-in">
            <button className="btn me-md-2" type="button">Sign In</button>
          </Link>
          <Link to="sign-up">
            <button type="button" className="btn btn-outline-success">Sign Up</button>
          </Link>
        </div>}
      {state.isLogged
        && <div className="navbar__btn d-grid gap-2 d-md-flex justify-content-md-end">
          <Link to="articles/new">
            <button className="btn btn-outline-success navbar__btn-create" type="button">Create article</button>
          </Link>
          <Link to="edit-profile">
            <div className="navbar__profile-container">
              <p className="navbar__profile-name">{localStorage.getItem('username')}</p>
              <img
                className="navbar__profile-avatar"
                alt="avatar"
                src={localStorage.getItem('avatar') ? localStorage.getItem('avatar') : urlTmpPic} // XZ
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
