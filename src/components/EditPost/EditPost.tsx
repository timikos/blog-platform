import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { SubmitHandler } from 'react-hook-form'
import { useSelector } from 'react-redux'

import {
  IFormInputCreatePost,
  IPostDetails,
  IStatePosts, ITag
} from '../../interfaces'
import { RootState } from '../../redux/store'
import { editPostFetch, editPostPutFetch } from '../../apis/api'
import setTagsForRequest from '../../helpers/setTags'
import TemplateFormPost from '../TemplateFormPost'

import '../CreatePost/CreatePost.scss'

const EditPost: React.FC = () => {
  const state: IStatePosts = useSelector((state: RootState) => ({
    posts: state.slugReducer.posts,
    loadingPosts: state.slugReducer.loadingPosts
  }))
  const { id } = useParams<{id: string}>()
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const [post, setPost] = useState<IPostDetails | null>(null)
  const [tags, setTags] = useState<Array<ITag>>([])
  const [num, setNum] = useState<number>(1)

  useEffect(() => {
    if (id) {
      const asyncFetch = async () => {
        try {
          const res = await editPostFetch(state, id)
          setPost({
            title: res.data.article.slug,
            tags: res.data.article.tagList,
            description: res.data.article.description,
            text: res.data.article.body,
            author: res.data.article.author,
            createdAt: res.data.article.createdAt,
            favoritesCount: res.data.article.favoritesCount,
            favorited: res.data.article.favorited
          })
          res.data.article.tagList.map((elem, index) => {
            const newArr = tags
            newArr.push({ id: index })
            return setTags(newArr)
          })
          setNum(res.data.article.tagList.length)
        } catch (e) {
          return e
        }
      }
      asyncFetch()
    }
  }, [id])

  const delTag = (e) => {
    const inx = +(e.target.id)
    setTags([...tags.slice(0, inx), ...tags.slice(inx + 1)])
    if (post) {
      setPost({
        title: post.title,
        description: post.description,
        text: post.text,
        createdAt: post.createdAt,
        author: post.author,
        favorited: post.favorited,
        favoritesCount: post.favoritesCount,
        tags: [...post.tags.slice(0, inx), ...post.tags.slice(inx + 1)]
      })
    }
  }

  const addTag = (num) => {
    setNum(num + 1)
    const newTag = {
      id: num
    }
    setTags([...tags, newTag])
    if (post) {
      setPost({
        title: post.title,
        description: post.description,
        text: post.text,
        createdAt: post.createdAt,
        author: post.author,
        tags: post.tags,
        favorited: post.favorited,
        favoritesCount: post.favoritesCount
      })
    }
  }
  const onSubmit: SubmitHandler<IFormInputCreatePost> = async (data: any) => {
    setError(null)
    setTagsForRequest(data)
    if (id) {
      try {
        await editPostPutFetch(state, id, data)
        navigate('/')
        document.location.reload()
      } catch (e) {
        setError(e)
        setTimeout(() => {
          setError(null)
        }, 3000)
      }
    }
  }

  return (
    <TemplateFormPost
      addTag={() => addTag(num)}
      delTag={delTag}
      onSubmit={onSubmit}
      tags={tags}
      tagList={post?.tags}
      error={error}
      label="Edit article"
      title={post?.title}
      description={post?.description}
      text={post?.text}
    />
  )
}

export default EditPost
