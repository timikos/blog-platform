import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://kata.academy:8021/api/',
  responseType: 'json',
  headers: {
    Authorization: `Token ${localStorage.getItem('token')}`
  }
})

export const postsFetch = async page => {
  const response = await instance.get(`/articles/?limit=5&offset=${page}`)
  return response
}

export const accountFetch = async () => {
  const response = await instance.get('/user')
  return response
}

export const signUpFetch = async data => {
  const response = await instance.post('/users', {
    user: {
      username: data.firstName,
      email: data.emailAddress,
      password: data.password,
      image: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/No_image.JPG'
    },
  })
  return response
}

export const signInFetch = async data => {
  const response = await instance.post('/users/login', {
    user: {
      email: data.emailAddress,
      password: data.password,
    },
  })
  return response
}

export const editProfilePutFetch = async (data, state) => {
  const response = await instance.put('/user', {
    user: {
      email: data.emailAddress ? data.emailAddress : state.accountEmail,
      token: localStorage.getItem('token'),
      username: data.firstName ? data.firstName : state.accountName,
      bio: 'My bio',
      image: data.avatar ? data.avatar : localStorage.getItem('avatar'),
    }
  })
  return response
}

export const createPostFetch = async data => {
  const response = instance.post('/articles', {
    article: {
      title: data.title,
      description: data.description,
      body: data.text,
      tagList: data.tags
    }
  })
  return response
}

export const editPostFetch = async (state, id) => {
  const response = instance.get(`/articles/${state.posts[id].slug}`)
  return response
}

export const editPostPutFetch = async (state, id, data) => {
  const response = await instance.put(`/articles/${state.posts[id].slug}`, {
    article: {
      title: data.title,
      description: data.description,
      body: data.text,
      tagList: data.tags
    }
  })
  return response
}

export const postDetailsGetFetch = async (state, id) => {
  const response = instance.get(`/articles/${state.posts[id].slug}`)
  return response
}

export const favoritePostFetch = async (state, id) => {
  const response = instance.post(`articles/${state.posts[id].slug}/favorite`)
  return response
}

export const unfavoritePostFetch = async (state, id) => {
  const response = instance.delete(`articles/${state.posts[id].slug}/favorite`)
  return response
}
