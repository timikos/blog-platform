import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SubmitHandler } from 'react-hook-form'

import { IFormInputCreatePost, ITag } from '../../interfaces'
import setTagsForRequest from '../../helpers/setTags'
import { createPostFetch } from '../../apis/api'
import TemplateFormPost from '../TemplateFormPost'

import './CreatePost.scss'

const CreatePost: React.FC = () => {
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const [tags, setTags] = useState<Array<ITag>>([{ id: 0 }])
  const delTag = (e) => {
    const inx: number = +(e.target.id)
    setTags([...tags.slice(0, inx), ...tags.slice(inx + 1)])
  }
  const addTag = (num: number) => {
    const newTag = {
      id: num
    }
    setTags([...tags, newTag])
  }
  const onSubmit: SubmitHandler<IFormInputCreatePost> = async (data: any) => {
    setError(null)
    setTagsForRequest(data)
    try {
      await createPostFetch(data)
      navigate('/')
    } catch (e) {
      setError(e)
      setTimeout(() => {
        setError(null)
      }, 3000)
    }
  }

  return (
    <TemplateFormPost
      addTag={addTag}
      delTag={delTag}
      onSubmit={onSubmit}
      tags={tags}
      tagList=""
      error={error}
      title=""
      description=""
      text=""
      label={'Create new article'}
    />
  )
}

export default CreatePost
