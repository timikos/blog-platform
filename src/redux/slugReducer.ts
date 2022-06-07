import {
  FETCH_POSTS_ERROR,
  FETCH_POSTS_START,
  FETCH_POSTS_SUCCESS,
  NULL_POSTS,
} from './actionTypes'

type Action<K, V = void> = V extends void ? { type: K } : { type: K } & V

export type ActionType =
  | Action<'FETCH_POSTS_ERROR', { error: Array<string> }>
  | Action<'FETCH_POSTS_START'>
  | Action<'FETCH_POSTS_SUCCESS', { posts: Array<string> }>
  | Action<'NULL_POSTS', { posts: Array<string> }>

interface StateType {
  posts: Array<string>,
  loadingPosts: boolean,
  error: Array<string>
}

const initialState: StateType = {
  posts: [],
  loadingPosts: false,
  error: [],
}

const slugReducer = (state: StateType = initialState, action: ActionType) => {
  switch (action.type) {
  case NULL_POSTS:
    return {
      ...state,
      posts: []
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
