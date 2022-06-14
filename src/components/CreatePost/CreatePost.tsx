import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'

import { IFormInputCreatePost, IResponseAccount, ITag } from '../../interfaces'
import setTagsForRequest from '../../helpers/setTags'

import './CreatePost.scss'

const CreatePost: React.FC = () => {
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const [tags, setTags] = useState<Array<ITag>>([{ id: 0 }])
  const [num, setNum] = useState<number>(1)
  const {
    register, handleSubmit
  } = useForm<IFormInputCreatePost>()
  const delTag = (e) => {
    const inx: number = +(e.target.id)
    setTags([...tags.slice(0, inx), ...tags.slice(inx + 1)])
  }
  const addTag = (num: number) => {
    setNum(num + 1)
    const newTag = {
      id: num
    }
    setTags([...tags, newTag])
  }
  const onSubmit: SubmitHandler<IFormInputCreatePost> = (data: any) => {
    setError(null)
    setTagsForRequest(data)
    axios.post<IResponseAccount>('https://kata.academy:8021/api/articles', {
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
      })
      .catch(e => {
        setError(e)
        setTimeout(() => {
          setError(null)
        }, 3000)
      })
  }

  const elementsTags = tags.map((elem, index) => {
    return (
      <div className="mb-3 tags__container" key={elem.id}>
        <input
          {...register(`tags.${elem.id}`, {
            required: false,
            minLength: 3,
            maxLength: 40,
          })}
          type="text"
          className="form-control tag-input"
          placeholder="Tag"
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

  return (
    <section className="create-post__container">
      {error
        ? <div className="alert alert-danger edit-profile__danger" role="alert">
          Server error!
        </div>
        : null}
      <form onSubmit={handleSubmit(onSubmit)} className="create-post__form">
        <h4 className="create-post__name-container">Create new article</h4>
        <div className="mb-3 create-post__title-container">
          <label htmlFor="formGroupExampleInput" className="form-label">Title</label>
          <input
            {...register('title', {
              required: true,
              minLength: 3,
              maxLength: 20,
            })}
            type="text"
            className="form-control"
            id="formGroupExampleInput"
            placeholder="Title"
          />
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
      </form>
    </section>
  )
}

export default CreatePost
