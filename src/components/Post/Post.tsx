import React from 'react'
import { format, parseISO } from 'date-fns'
import axios from 'axios'

import { IPropsType } from '../../interfaces'

import './Post.scss'

const Post: React.FC<IPropsType> = (
  {
    title, description,
    createdAt,
    tagList, author,
    favoritesCount, favorited,
    slug
  }
) => {
  const setLike = () => {
    if (!favorited) {
      axios.post(`https://kata.academy:8021/api/articles/${slug}/favorite`, {}, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`
        }
      }).catch(e => e)
    } else {
      axios.delete(`https://kata.academy:8021/api/articles/${slug}/favorite`, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`
        }
      })
        .catch(e => e)
    }
  }
  const limitTitle = (title) => {
    const limited = title.substring(0, 50) + '...'
    return title.length > 50 ? limited : title
  }
  return (
    <div className="post__container">
      <p className="post__title">{limitTitle(title)}</p>
      <div
        role="button"
        tabIndex={0}
        className="post__likes-container"
        onClick={setLike}
        onKeyDown={() => setLike}
      >
        <i className="bi bi-heart" />
        <p className="post__likes-counter">{favoritesCount}</p>
      </div>
      <div className="post__tags-container">
        {tagList ? tagList.map((elem, index) => {
          return (
            <p key={index} className="post__tags">{elem}</p>
          )
        }) : null}
      </div>
      <p className="post__content">{description}</p>
      <div className="post__profile-container">
        <p className="post__profile-name">{author.username}</p>
        <p className="post__profile-date">{format(parseISO(createdAt), 'MMMM dd, yyyy')}</p>
        <img
          className="post__profile-img"
          src={author.image
            ? author.image
            : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png'}
          alt="profile"
        />
      </div>
    </div>
  )
}

export default Post
