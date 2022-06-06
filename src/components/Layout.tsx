import { Outlet } from 'react-router-dom'
import React from 'react'

import Navbar from './Navbar'

const Layout = () => {
  return (
    <>
      <header className="header__container">
        <Navbar />
      </header>
      <main className="main__container">
        <Outlet />
      </main>
    </>
  )
}

export default Layout
