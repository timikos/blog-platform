import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import { IFormInputCreatePost } from '../interfaces'

const TemplateFormPost = ({
  addTag, delTag, onSubmit,
  tags, error, tagList,
  label, title, description, text
}) => {
  const [num, setNum] = useState<number>(1)
  const {
    register, handleSubmit, formState: { errors }
  } = useForm<IFormInputCreatePost>()

  const elementsTags = tags.map((elem, index) => {
    return (
      <div className="mb-3 tags__container" key={index}>
        <input
          {...register(`tags.${elem.id}`, {
            required: false,
            minLength: 3,
            maxLength: 40,
          })}
          type="text"
          className="form-control tag-input"
          placeholder="Tag"
          defaultValue={tagList[index]}
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
        <h4 className="create-post__name-container">{label}</h4>
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
            defaultValue={title}
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
            defaultValue={description}
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
            defaultValue={text}
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

export default TemplateFormPost
