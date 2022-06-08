import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import { Pagination } from '@mui/material'

import Post from '../Post'
import { RootState } from '../../redux/store'
import { fetchPosts, nullPosts } from '../../redux/slugAction'

import './Content.scss'

interface ElemTypes {
  title: string,
  description: string,
  createdAt: string,
  tagList: React.ReactNode[],
  author: {
    username: string,
    image: string,
  }
}

const Content: React.FC = () => {
  const [page, setPage] = useState<number>(1)
  const state = useSelector((state: RootState) => ({
    posts: state.slugReducer.posts
  }))
  const dispatch = useDispatch()

  const paginationChange = (e) => {
    setPage(e.target.ariaLabel[11])
    dispatch(nullPosts())
    dispatch<any>(fetchPosts(page))
  }
  const elements = state.posts.map((elem: string, index: number) => {
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
