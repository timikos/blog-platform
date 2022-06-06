import React from 'react'

import './Post.scss'

const Post: React.FC = ({
  title, body,
  tagList, author
}) => {
  return (
    <div className="post__container">
      <p className="post__title">{title}</p>
      <div className="post__likes-container">
        <i className="bi bi-heart"></i>
        <p className="post__likes-counter">0</p>
      </div>
      <p className="post__tags">TAGS</p>
      <p className="post__content">{body}</p>
      <div className="post__profile-container">
        <p className="post__profile-name">{author.username}</p>
        <p className="post__profile-date">MARCH 5, 2020</p>
        <img className="post__profile-img" src={author.image}/>
      </div>
    </div>
  )
}

export default Post
