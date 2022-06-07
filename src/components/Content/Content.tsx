import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import React, { useRef, useState } from 'react'

import Post from '../Post'
import { RootState } from '../../redux/store'

import './Content.scss'
import { Pagination } from '@mui/material'
import { fetchPosts, nullPosts } from '../../redux/slugAction'

const Content: React.FC = () => {
  const [page, setPage] = useState(1)
  const state = useSelector((state: RootState) => ({
    posts: state.slugReducer.posts
  }))
  const dispatch = useDispatch()

  const paginationChange = (e) => {
    setPage(e.target.ariaLabel[11])
    dispatch(nullPosts())
    dispatch<any>(fetchPosts(page))
  }
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
      <Pagination
        count={10}
        shape="rounded"
        onChange={paginationChange}
        sx={{
          display: 'flex',
          justifyContent: 'center'
        }}
      />
    </section>

  )
}

export default Content
