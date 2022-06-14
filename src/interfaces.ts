import React from 'react'

export interface IResponseAccount {
  user: {
    email: string,
      token: string,
      username: string,
      bio: string,
      image: string
  }
}

export interface IResponseArticles {
  articles: [
    {
      slug: string,
      title: string,
      description: string,
      body: string,
      tagList: Array<string>,
      createdAt: string,
      updatedAt: string,
      favorited: boolean,
      favoritesCount: number,
      author: {
        username: string,
        bio: string,
        image: string,
        following: boolean
      }
    }
  ],
  articlesCount: number
}

export interface IResponsePost {
  slug: string,
  title: string,
  description: string,
  body: string,
  tagList: Array<string>,
  createdAt: string,
  updatedAt: string,
  favorited: boolean,
  favoritesCount: number,
  author: {
    username: string,
    bio: string,
    image: string,
    following: boolean
  }
}

export interface IFormInputEdit {
  firstName: string;
  emailAddress: string;
  password: string;
  avatar: string | undefined | null
}

export interface IFormInputSignUp {
  firstName: string;
  emailAddress: string;
  password: string;
  repeatPassword: string;
  myCheckbox: string;
}

export interface IFormInputSignIn {
  emailAddress: string;
  password: string;
}

export interface IFormInputCreatePost {
  title: string;
  description: string;
  text: string;
  tags: Array<string>;
}

export interface ITag {
  id: number
}

export interface IStateTypeReducer {
  posts: Array<string>,
  loadingPosts: boolean,
  error: Array<string>,
  isLogged: boolean,
}

export interface IStatePosts {
  posts: string[],
  loadingPosts: boolean,
}

export interface IStatePostDetails {
  posts: string[],
  isLogged: boolean
}

export interface IStateIsLogged {
  isLogged: boolean
}

export interface IPropsType {
  slug: string,
  title: string,
  description: string,
  createdAt: string,
  tagList: string[],
  favorited: boolean,
  favoritesCount: number,
  author: {
    username: string,
    image: string,
  }
}

export interface IPostDetails {
  title: string;
  tags: Array<string>;
  description: string;
  createdAt: string;
  text: string;
  favoritesCount: number;
  favorited: boolean;
  author: {
    username: string;
    image: string;
  }
}
