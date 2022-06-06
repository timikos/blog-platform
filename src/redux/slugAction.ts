import axios from 'axios'

import {
  FETCH_POSTS_ERROR,
  FETCH_POSTS_START,
  FETCH_POSTS_SUCCESS,
} from './actionTypes'

export function fetchPosts() {
  return async dispatch => {
    dispatch(fetchPostsStart())
    try {
      const response = await axios.get('https://kata.academy:8021/api/articles/')
      const posts = [...response.data.articles]
      dispatch(fetchPostsSuccess(posts))
    } catch (e) {
      // if (e.response.status === 404 || e.response.status === 500) {
      // }
      dispatch(fetchPostsError(e))
    }
  }
}

export function fetchPostsStart() {
  return {
    type: FETCH_POSTS_START
  }
}

export function fetchPostsSuccess(posts) {
  return {
    type: FETCH_POSTS_SUCCESS,
    posts
  }
}

export function fetchPostsError(e) {
  return {
    type: FETCH_POSTS_ERROR,
    error: e
  }
}
