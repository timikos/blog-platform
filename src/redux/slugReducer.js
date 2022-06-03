import {
  FETCH_POSTS_ERROR,
  FETCH_POSTS_START,
  FETCH_POSTS_SUCCESS,
} from './actionTypes'

const initialState = {
  posts: [],
  loadingTickets: false,
  error: null,
}

const slugReducer = (state = initialState, action) => {
  switch (action.type) {
  case FETCH_POSTS_START:
    return {
      ...state,
      loadingTickets: true
    }
  case FETCH_POSTS_SUCCESS:
    return {
      ...state,
      loadingTickets: false,
      posts: [...state.posts, ...action.posts]
    }
  case FETCH_POSTS_ERROR:
    return {
      ...state,
      loadingTickets: false,
      error: action.error
    }
  }
}

export default slugReducer
