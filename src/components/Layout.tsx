import React from 'react'
import { Outlet } from 'react-router-dom'

import Navbar from './Navbar'

const Layout: React.FC = () => {
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
