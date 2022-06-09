import React from 'react'

import './CreatePost.scss'

const CreatePost = () => {
  const tags = [1, 2]
  return (
    <section className="create-post__container">
      <h4 className="create-post__name-container">Create new article</h4>
      <div className="mb-3 create-post__title-container">
        <label htmlFor="formGroupExampleInput" className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          id="formGroupExampleInput"
          placeholder="Title"
        />
      </div>
      <div className="mb-3 create-post__description-container">
        <label htmlFor="formGroupExampleInput" className="form-label">Short description</label>
        <input
          type="text"
          className="form-control"
          id="formGroupExampleInput"
          placeholder="Description"
        />
      </div>
      <div className="mb-3 create-post__text-container">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">Text</label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows={6}
          placeholder="Text"
        />
      </div>
      <div className="create-post__tags-container">
        <p>Tags</p>
        {tags.map((elem, index) => {
          return (
            <div className="mb-3 tags__container">
              <input
                type="text"
                className="form-control tag-input"
                id="formGroupExampleInput2"
                placeholder="Tag"
              />
              <button type="button" className="btn btn-outline-danger tag-btn__del">Delete</button>
              <button type="button" className="btn btn-outline-primary tag-btn__add">Add tag</button>
            </div>
          )
        })}
        <button type="button" className="btn btn-primary create-post__send">Send</button>
      </div>
    </section>
  )
}

export default CreatePost
