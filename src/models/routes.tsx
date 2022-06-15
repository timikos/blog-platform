import Content from '../components/Content'
import CreatePost from '../components/CreatePost'
import SignIn from '../components/SignIn'
import PostDetails from '../components/PostDetails'
import EditPost from '../components/EditPost'
import NoAccess from '../components/NoAccess'
import SignUp from '../components/SignUp'
import EditProfile from '../components/EditProfile'
import NotFoundPage from '../components/NotFoundPage'

const appRoutes = [
  {
    path: '/',
    element: <Content />
  },
  {
    path: 'articles',
    element: <Content />
  },
  {
    path: 'articles/new-article',
    element: localStorage.getItem('token')
      ? <CreatePost />
      : <SignIn />
  },
  {
    path: 'articles/:id',
    element: <PostDetails />
  },
  {
    path: 'articles/:id/edit',
    element: localStorage.getItem('token')
      ? <EditPost />
      : <NoAccess />
  },
  {
    path: 'sign-in',
    element: <SignIn />
  },
  {
    path: 'sign-up',
    element: <SignUp />
  },
  {
    path: 'edit-profile',
    element: localStorage.getItem('token')
      ? <EditProfile />
      : <NoAccess />
  },
  {
    path: '*',
    element: <NotFoundPage />
  },
]

export default appRoutes
