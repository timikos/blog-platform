import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
import ReactMarkdown from 'react-markdown'

import { RootState } from '../../redux/store'
import { IPostDetails, IStatePostDetails } from '../../interfaces'

import './PostDetails.scss'

const PostDetails = () => {
  const { id } = useParams<{id: string}>()
  const [post, setPost] = useState<IPostDetails | null>(null)
  const state: IStatePostDetails = useSelector((state: RootState) => ({
    posts: state.slugReducer.posts
  }))
  useEffect(() => {
    if (id) {
      axios.get(`https://kata.academy:8021/api/articles/${state.posts[id].slug}`)
        .then(res => setPost({
          title: res.data.article.slug,
          tags: res.data.article.tagList,
          description: res.data.article.description,
          text: res.data.article.body,
          author: res.data.article.author,
        }))
    }
  }, [id])
  return (
    <section>
      {post
    && <div className="post-details__container">
      <p className="post-details__title">{post.title}</p>
      <div className="post-details__likes-container">
        <i className="bi bi-heart" />
        <p className="post-details__likes-counter">0</p>
      </div>
      <p className="post-details__tags">{post.tags}</p>
      <p className="post-details__description">{post.description}</p>
      <ReactMarkdown className="post-details__content">
        {post.text}
      </ReactMarkdown>
      <div className="post-details__profile-container">
        <p className="post-details__profile-name">{post.author.username}</p>
        <p className="post-details__profile-date">MARCH 5, 2020</p>
        <img className="post-details__profile-img" src={post.author.image} alt="profile" />
      </div>
    </div> }
    </section>

  )
}

export default PostDetails
