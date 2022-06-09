import { IStateTypeReducer } from '../interfaces'

import {
  FETCH_POSTS_ERROR,
  FETCH_POSTS_START,
  FETCH_POSTS_SUCCESS,
  NULL_POSTS,
  LOGIN, LOGOUT,
} from './actionTypes'

type Action<K, V = void> = V extends void ? { type: K } : { type: K } & V

export type ActionType =
  | Action<'FETCH_POSTS_ERROR', { error: Array<string> }>
  | Action<'FETCH_POSTS_START'>
  | Action<'FETCH_POSTS_SUCCESS', { posts: Array<string> }>
  | Action<'NULL_POSTS', { posts: Array<string> }>
  | Action<'LOGIN', { isLogged: boolean }>
  | Action<'LOGOUT', { isLogged: boolean }>

const initialState: IStateTypeReducer = {
  posts: [],
  loadingPosts: false,
  error: [],
  isLogged: false,
}

const slugReducer = (state: IStateTypeReducer = initialState, action: ActionType) => {
  switch (action.type) {
  case NULL_POSTS:
    return {
      ...state,
      posts: []
    }
  case LOGIN:
    return {
      ...state,
      isLogged: true,
    }
  case LOGOUT:
    return {
      ...state,
      isLogged: false,
    }
  case FETCH_POSTS_START:
    return {
      ...state,
      loadingPosts: true
    }
  case FETCH_POSTS_SUCCESS:
    return {
      ...state,
      loadingPosts: false,
      posts: [...state.posts, ...action.posts]
    }
  case FETCH_POSTS_ERROR:
    return {
      ...state,
      loadingPosts: false,
      error: action.error
    }
  default:
    return {
      ...state
    }
  }
}

export default slugReducer
