import React from 'react'
import { format, parseISO } from 'date-fns'

import './Post.scss'

interface PropsType {
  title: string,
  description: string,
  createdAt: string,
  tagList: React.ReactNode,
  author: {
    username: string,
    image: React.ReactNode
  }
}

const Post: React.FC<PropsType> = (
  {
    title, description,
    createdAt,
    tagList, author
  }
) => {
  return (
    <div className="post__container">
      <p className="post__title">{title}</p>
      <div className="post__likes-container">
        <i className="bi bi-heart" />
        <p className="post__likes-counter">0</p>
      </div>
      <div className="post__tags-container">
        {tagList.map((elem, index) => {
          return (
            <p key={index} className="post__tags">{elem}</p>
          )
        })}
      </div>
      <p className="post__content">{description}</p>
      <div className="post__profile-container">
        <p className="post__profile-name">{author.username}</p>
        <p className="post__profile-date">{format(parseISO(createdAt), 'MMMM dd, yyyy')}</p>
        <img className="post__profile-img" src={author.image} alt="profile" />
      </div>
    </div>
  )
}

export default Post
