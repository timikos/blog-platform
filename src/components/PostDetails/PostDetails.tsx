import { MouseEventHandler, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
import ReactMarkdown from 'react-markdown'
import { Popconfirm } from 'antd'
import { format, parseISO } from 'date-fns'

import { RootState } from '../../redux/store'
import { IPostDetails, IStatePosts } from '../../interfaces'
import { favoritePostFetch, postDetailsGetFetch, unfavoritePostFetch } from '../../apis/api'

import './PostDetails.scss'
import 'antd/dist/antd.min.css'

const PostDetails = () => {
  const { id } = useParams<{id: string}>()
  const navigate = useNavigate()
  const [post, setPost] = useState<IPostDetails | null>(null)
  const state: IStatePosts = useSelector((state: RootState) => ({
    posts: state.slugReducer.posts,
    loadingPosts: state.slugReducer.loadingPosts
  }))
  useEffect(() => {
    if (id) {
      const asyncFetch = async () => {
        try {
          const res = await postDetailsGetFetch(state, id)
          setPost({
            title: res.data.article.slug,
            tags: res.data.article.tagList,
            description: res.data.article.description,
            text: res.data.article.body,
            createdAt: res.data.article.createdAt,
            author: res.data.article.author,
            favoritesCount: res.data.article.favoritesCount,
            favorited: res.data.article.favorited
          })
        } catch (e) {
          return e
        }
      }
      asyncFetch()
    }
  }, [id])

  const deletePost = () => {
    if (id) {
      axios.delete(`https://kata.academy:8021/api/articles/${state.posts[id].slug}`, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`
        }
      }).catch(e => e)
    }
  }

  const editPost: MouseEventHandler<HTMLButtonElement> = () => {
    navigate('edit')
  }
  const setLike = async () => {
    if (id && post) {
      if (!post?.favorited) {
        try {
          await favoritePostFetch(state, id)
          setPost({
            title: post.title,
            tags: post.tags,
            description: post.description,
            text: post.text,
            createdAt: post.createdAt,
            author: post.author,
            favoritesCount: post.favoritesCount + 1,
            favorited: post.favorited
          })
        } catch (e) {
          return e
        }
      } else {
        try {
          await unfavoritePostFetch(state, id)
          setPost({
            title: post.title,
            tags: post.tags,
            description: post.description,
            text: post.text,
            createdAt: post.createdAt,
            author: post.author,
            favoritesCount: post.favoritesCount - 1,
            favorited: post.favorited
          })
        } catch (e) {
          return e
        }
      }
    }
  }
  return (
    <section>
      {post
      && <div className="post-details__container">
        <p className="post-details__title">{post.title}</p>
        <div
          role="button"
          tabIndex={0}
          className="post-details__likes-container"
          onClick={setLike}
          onKeyDown={() => setLike}
        >
          <i className="bi bi-heart" />
          <p className="post-details__likes-counter">{post.favoritesCount}</p>
        </div>
        <div className="post-details__tags-container">
          {post.tags ? post.tags.map((elem, index) => {
            return (
              <p key={index} className="post-details__tags">{elem}</p>
            )
          }) : null}
        </div>
        <p className="post-details__description">{post.description}</p>
        <ReactMarkdown className="post-details__content">
          {post.text}
        </ReactMarkdown>
        <div className="post-details__profile-container">
          <p className="post-details__profile-name">{post.author.username}</p>
          <p className="post-details__profile-date">{format(parseISO(post.createdAt), 'MMMM dd, yyyy')}</p>
          <img className="post-details__profile-img" src={post.author.image} alt="profile" />
        </div>
        {(localStorage.getItem('token')
          && post.author.username === localStorage.getItem('username'))
            && <div className="post-details__buttons">
              <Popconfirm
                title="???? ???????????????"
                onConfirm={deletePost}
                okText="????"
                cancelText="??????"
              >
                <button
                  type="button"
                  className="btn btn-outline-danger btn-delete"
                >
                  Delete
                </button>
              </Popconfirm>
              <button
                type="button"
                className="btn btn-outline-success btn-edit"
                onClick={editPost}
              >
                Edit
              </button>
            </div>}
      </div> }
    </section>
  )
}

export default PostDetails
