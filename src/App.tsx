import React from 'react'
import { useDispatch } from 'react-redux'

import MainContainer from './containers/MainContainer/MainContainer'
import Header from './containers/Header/Header'
import { fetchPosts } from './redux/slugAction'

import './App.scss'

const App: React.FC = () => {
  const dispatch = useDispatch()
  dispatch(fetchPosts())
  return (
    <div className="App">
      <Header />
      <MainContainer />
    </div>
  )
}

export default App
