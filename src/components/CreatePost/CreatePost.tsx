import React, { ChangeEvent, useRef, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'

import { IResponseAccount } from '../../interfaces'

import './CreatePost.scss'

interface IFormInputCreatePost {
  title: string;
  description: string;
  text: string;
  tags: Array<string>;
}

const CreatePost: React.FC = () => {
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const [tags, setTags] = useState<string[]>([''])
  const {
    register, handleSubmit, formState: { errors }
  } = useForm<IFormInputCreatePost>()
  const delTag = (e) => {
    setTags(() => {
      const inx = elementsTags.findIndex((elem, index) => {
        console.log(e.target.key)
        console.log(index)
        // elem.key === index
      })

      console.log(inx)
      return [...tags.slice(0, inx), ...tags.slice(inx + 1)]
    })
  }
  console.log(tags)
  const addTag = () => {
    const newTag = ''
    const newArr = [...tags, newTag]
    setTags(newArr)
  }
  const onSubmit: SubmitHandler<IFormInputCreatePost> = data => {
    setError(null)
    let tagsArray = Object.keys(data).map((elem, index) => {
      if (elem.match(/tags/g)) return Object.values(data)[index]
    })
    tagsArray = tagsArray.filter(elem => elem)
    data.tags = [...tagsArray]

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
        console.log(e)
        setError(e)
        setTimeout(() => {
          setError(null)
        }, 3000)
      })
  }

  const elementsTags = tags.map((elem, index) => {
    return (
      <div className="mb-3 tags__container" key={index}>
        <input
          {...register(`tags${index}`, {
            required: false,
            minLength: 3,
            maxLength: 40,
          })}
          type="text"
          className="form-control tag-input"
          placeholder="Tag"
        />
        <button
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
            onClick={addTag}
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
