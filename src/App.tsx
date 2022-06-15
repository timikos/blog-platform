import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { fetchPosts, login } from './redux/slugAction'
import Header from './containers/Header'
import appRoutes from './models/routes'
import { accountFetch } from './apis/api'

import './App.scss'

const App: React.FC = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch<any>(fetchPosts(0))
    const fetchData = async () => {
      if (localStorage.getItem('token')) {
        try {
          const res = await accountFetch()
          console.log(res)
          dispatch(login(res.data.user.username, res.data.user.email))
        } catch (e) {
          return e
        }
      }
    }
    fetchData()
  }, [])

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          { appRoutes.map(({ path, element }, index) => {
            return <Route path={path} element={element} key={index} />
          })}
        </Routes>
      </div>
    </Router>
  )
}

export default App
