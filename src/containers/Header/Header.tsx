import React from 'react'

import Navbar from '../../components/Navbar'

import './Header.scss'

const Header: React.FC = () => {
  return (
    <header className="header__container" >
      <Navbar />
    </header>
  )
}

export default Header
