import React from 'react'
import './Navbar.scss'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { logout } from '../../redux/slugAction'

const Navbar: React.FC = () => {
  const state = useSelector(state => ({
    isLogged: state.slugReducer.isLogged
  }))
  const dispatch = useDispatch()
  const logoutHandler = () => {
    dispatch(logout())
  }
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
          <Link to="/">
            <button className="btn btn-outline-success navbar__btn-create" type="button">Create article</button>
          </Link>
          <div className="navbar__profile-container">
            <p className="navbar__profile-name">JOHN DOE</p>
            <img alt="avatar" src="" />
          </div>
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
