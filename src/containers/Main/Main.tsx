import React from 'react'
import { Outlet } from 'react-router-dom'

const Main = () => {
  return (
    <main className="main__container">
      <Outlet />
    </main>
  )
}

export default Main
