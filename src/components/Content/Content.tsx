import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import { Box, LinearProgress, Pagination } from '@mui/material'

import Post from '../Post'
import { RootState } from '../../redux/store'
import { fetchPosts, nullPosts } from '../../redux/slugAction'
import { IStatePosts } from '../../interfaces'

import './Content.scss'

const Content: React.FC = () => {
  const [page, setPage] = useState<number>(1)
  const state: IStatePosts = useSelector((state: RootState) => ({
    posts: state.slugReducer.posts,
    loadingPosts: state.slugReducer.loadingPosts
  }))
  const dispatch = useDispatch()
  const paginationChange = (e) => {
    setPage(e.target.ariaLabel[11])
    dispatch(nullPosts())
    dispatch<any>(fetchPosts(page))
  }
  const elements: JSX.Element[] = state.posts.map((elem: any, index: number) => {
    return (
      <li key={index}>
        <Link to={`/articles/${index}`}>
          <Post {...elem} />
        </Link>
      </li>
    )
  })

  return (
    <section className="content">
      {state.loadingPosts
      && <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>}
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
