import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

import {
  IFormInputCreatePost,
  IPostDetails,
  IResponseAccount,
  IStatePostDetails, ITag
} from '../../interfaces'
import { RootState } from '../../redux/store'
import setTagsForRequest from '../../helpers/setTags'

import '../CreatePost/CreatePost.scss'

const EditPost: React.FC = () => {
  const state: IStatePostDetails = useSelector((state: RootState) => ({
    posts: state.slugReducer.posts,
    isLogged: state.slugReducer.isLogged
  }))
  const { id } = useParams<{id: string}>()
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const [post, setPost] = useState<IPostDetails | null>(null)
  const [tags, setTags] = useState<Array<ITag>>([])
  const [num, setNum] = useState<number>(1)
  const {
    register, handleSubmit, formState: { errors }
  } = useForm<IFormInputCreatePost>()
  useEffect(() => {
    if (id) {
      axios.get(`https://kata.academy:8021/api/articles/${state.posts[id].slug}`)
        .then(res => {
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
        })
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
  const onSubmit: SubmitHandler<IFormInputCreatePost> = (data: any) => {
    setError(null)
    setTagsForRequest(data)
    if (id) {
      axios.put<IResponseAccount>(`https://kata.academy:8021/api/articles/${state.posts[id].slug}`, {
        article: {
          title: data.title,
          description: data.description,
          body: data.text,
          tagList: data.tags
        }
      }, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`
        }
      })
        .then(() => {
          navigate('/')
          document.location.reload()
        })
        .catch(e => {
          setError(e)
          setTimeout(() => {
            setError(null)
          }, 3000)
        })
    }
  }

  const elementsTags = post
    ? tags.map((elem, index) => {
      return (
        <div className="mb-3 tags__container" key={index}>
          <input
            {...register(`tags.${elem.id}`, {
              required: false,
              minLength: 3,
              maxLength: 40,
              pattern: {
                value: /[A-Za-z]{3}/,
                message: 'Wrong symbols'
              },
            })}
            type="text"
            className="form-control tag-input"
            placeholder="Tag"
            defaultValue={post?.tags[index]}
          />
          <button
            id={`${index}`}
            type="button"
            className="btn btn-outline-danger tag-btn__del"
            onClick={delTag}
          >
            Delete
          </button>
        </div>
      )
    })
    : null

  return (
    <section className="create-post__container">
      {error
        ? <div className="alert alert-danger edit-profile__danger" role="alert">
          Server error!
        </div>
        : null}
      {post
        && <form onSubmit={handleSubmit(onSubmit)} className="create-post__form">
          <h4 className="create-post__name-container">Edit article</h4>
          <div className="mb-3 create-post__title-container">
            <label htmlFor="formGroupExampleInput" className="form-label">Title</label>
            <input
              {...register('title', {
                required: true,
                minLength: 3,
                maxLength: 20,
                pattern: {
                  value: /[A-Za-z]{3}/,
                  message: 'Wrong symbols'
                },
              })}
              className="form-control"
              id="formGroupExampleInput"
              placeholder="Title"
              defaultValue={post.title}
            />
            {errors.title && <p className="create-post__error">{errors.title.message}</p>}
          </div>
          <div className="mb-3 create-post__description-container">
            <label htmlFor="formGroupExampleInput" className="form-label">Short description</label>
            <input
              {...register('description', {
                required: true,
                minLength: 3,
                maxLength: 40,
              })}
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              placeholder="Description"
              defaultValue={post.description}
            />
          </div>
          <div className="mb-3 create-post__text-container">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Text</label>
            <textarea
              {...register('text', {
                required: true,
                minLength: 3,
                maxLength: 40,
              })}
              className="form-control"
              id="exampleFormControlTextarea1"
              rows={6}
              placeholder="Text"
              defaultValue={post.text}
            />
          </div>
          <div className="create-post__tags-container">
            <p>Tags</p>
            {elementsTags}
            <button
              type="button"
              className="btn btn-outline-primary tag-btn__add"
              onClick={() => addTag(num)}
            >
              Add tag
            </button>
            <button
              type="submit"
              className="btn btn-primary create-post__send"
              value="Create"
            >
              Send
            </button>
          </div>
        </form>}
    </section>
  )
}

export default EditPost
