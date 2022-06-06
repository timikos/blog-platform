import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
import ReactMarkdown from 'react-markdown'

const PostDetails: React.FC = () => {
  const param = useParams()
  const [post, setPost] = useState({
    title: '',
    text: ''
  })
  const state = useSelector(state => ({
    posts: state.slugReducer.posts
  }))
  useEffect(() => {
    const response = axios.get(`https://kata.academy:8021/api/articles/${state.posts[param.id].slug}`)
      .then(res => setPost({
        title: res.data.article.slug,
        text: res.data.article.body,
      }))
  }, [param.id])
  return (
    <div>
      <ReactMarkdown children={post.text} />
    </div>
  )
}

export default PostDetails
