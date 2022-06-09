import React from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { fetchPosts, login } from './redux/slugAction'
import Layout from './components/Layout'
import Content from './components/Content'
import PostDetails from './components/PostDetails'
import NotFoundPage from './components/NotFoundPage'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Profile from './components/Profile'
import CreatePost from './components/CreatePost'
import store from './redux/store'
import NoAccess from './components/NoAccess'
import EditPost from './components/EditPost'
import EditProfile from './components/EditProfile'

import './App.scss'

const App: React.FC = () => {
  const dispatch = useDispatch()
  dispatch<any>(fetchPosts(0))
  localStorage.getItem('token')
    ? dispatch(login()) : null
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Content />} />
            <Route
              path="articles"
              element={<Content />}
            />
            <Route
              path="articles/new"
              element={
                store.getState().slugReducer.isLogged
                  ? <CreatePost />
                  : <NoAccess />
              }
            />
            <Route
              path="articles/:id"
              element={<PostDetails />}
            />
            <Route
              path="articles/:id/edit"
              element={
                store.getState().slugReducer.isLogged
                  ? <EditPost />
                  : <NoAccess />
              }
            />
            <Route path="sign-in" element={<SignIn />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="profile" element={<Profile />} />
            <Route
              path="edit-profile"
              element={
                localStorage.getItem('token')
                  ? <EditProfile />
                  : <NoAccess />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
