import React from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import './App.scss'

import { fetchPosts } from './redux/slugAction'
import Layout from './components/Layout'
import Content from './components/Content'
import PostDetails from './components/PostDetails'
import NotFoundPage from './components/NotFoundPage'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Profile from './components/Profile'

const App: React.FC = () => {
  const dispatch = useDispatch()
  dispatch<any>(fetchPosts(0))
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Content />} />
            <Route path="articles" element={<Content />} />
            <Route path="articles/:id" element={<PostDetails />} />
            <Route path="sign-in" element={<SignIn />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
