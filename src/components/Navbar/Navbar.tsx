import React from 'react'
import './Navbar.scss'
import { Link } from 'react-router-dom'

const Navbar: React.FC = () => {
  return (
    <div className="navbar">
      <Link to="/">
        <p className="navbar__logo">Realworld Blog</p>
      </Link>
      <div className="navbar__btn d-grid gap-2 d-md-flex justify-content-md-end">
        <Link to="sign-in">
          <button className="btn me-md-2" type="button">Sign In</button>
        </Link>
        <Link to="sign-up">
          <button type="button" className="btn btn-outline-success">Sign Up</button>
        </Link>
      </div>
    </div>
  )
}

export default Navbar
