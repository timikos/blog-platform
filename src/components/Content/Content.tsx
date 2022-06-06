import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import React from 'react'

import Post from '../Post'

import './Content.scss'

const Content: React.FC = () => {
  const state = useSelector(state => ({
    posts: state.slugReducer.posts
  }))
  console.log(state.posts)
  const elements = state.posts.map((elem, index) => {
    return (
      <li key={index}>
        <Link to={`/articles/${index}`}>
          <Post
            {...elem}
          />
        </Link>
      </li>
    )
  })

  return (
    <section className="content">
      <ul>
        {elements}
      </ul>
    </section>

  )
}

export default Content
