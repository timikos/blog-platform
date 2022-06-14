import axios, { AxiosResponse } from 'axios'
import { ThunkAction } from 'redux-thunk'
import { Action, AnyAction } from 'redux'

import { IResponseArticles, IResponsePost } from '../interfaces'

import { RootState } from './store'
import {
  FETCH_POSTS_ERROR,
  FETCH_POSTS_START,
  FETCH_POSTS_SUCCESS,
  NULL_POSTS,
  LOGIN, LOGOUT,
} from './actionTypes'

export function fetchPosts(page: number)
  : ThunkAction<void, RootState, unknown, Action<string>> {
  return async (dispatch) => {
    const url = `https://kata.academy:8021/api/articles/?limit=5&offset=${page}`
    dispatch(fetchPostsStart())
    try {
      const response: AxiosResponse = await axios.get<IResponseArticles>(url, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`
        }
      })
      const posts: Array<IResponsePost> = [...response.data.articles]
      dispatch(fetchPostsSuccess(posts))
    } catch (e) {
      dispatch(fetchPostsError(e))
    }
  }
}

export function nullPosts(): AnyAction {
  return {
    type: NULL_POSTS
  }
}

export function login(): AnyAction {
  return {
    type: LOGIN,
  }
}

export function logout(): AnyAction {
  return {
    type: LOGOUT
  }
}

export function fetchPostsStart(): AnyAction {
  return {
    type: FETCH_POSTS_START
  }
}

export function fetchPostsSuccess(posts: IResponsePost[]): AnyAction {
  return {
    type: FETCH_POSTS_SUCCESS,
    posts
  }
}

export function fetchPostsError(e: string[]): AnyAction {
  return {
    type: FETCH_POSTS_ERROR,
    error: e
  }
}
