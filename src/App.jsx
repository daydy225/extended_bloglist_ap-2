import { useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import { useField, useResource } from './hooks'
import { useNotification } from './context/NotificationContext'
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query'
import { useUser } from './context/UserContext'

const App = () => {
  const queryClient = useQueryClient()
  const baseUrl = import.meta.env.VITE_BACKEND_URL
  const username = useField('text')
  const password = useField('password')
  const { setNotification, clearNotification } = useNotification()

  const { login, loggedIn, logout, user } = useUser()

  const { fetchResources, create, update, remove } = useResource(baseUrl)

  // React query for fetching blogs
  const { data: blogs, isLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: fetchResources,
    retry: false,
    refreshOnWindowFocus: false,
  })

  // React query for fetching users

  const handleLogin = async event => {
    event.preventDefault()
    try {
      await login({ username: username.value, password: password.value })
      setNotification({
        message: `Welcome ${username.value}`,
        style: 'success',
      })
      clearNotification(3000)
    } catch (error) {
      setNotification({
        message: error.message,
        style: 'error',
      })
      clearNotification(3000)
    } finally {
      username.reset()
      password.reset()
    }
  }

  const blogFormRef = useRef()
  // add blog using react query mutation
  const createBlogMutation = useMutation(create, {
    onSuccess: newBlog => {
      queryClient.setQueryData(['blogs'], prevBlogs => [...prevBlogs, newBlog])
      setNotification({
        message: `A new blog ${newBlog.title} by ${newBlog.author} added`,
        style: 'success',
      })
      clearNotification(5000)
    },
    onError: error => {
      setNotification({
        message: error.message,
        style: 'error',
      })
      clearNotification(5000)
    },
  })

  const addBlogs = newObject => {
    blogFormRef.current.toggleVisibility()
    createBlogMutation.mutate(newObject)
  }

  // update blog like using react query mutation
  const updateBlogMutation = useMutation(update, {
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs'])
    },
  })
  const updateBlogs = blog => {
    updateBlogMutation.mutate({
      ...blog,
      likes: blog.likes + 1,
    })
  }

  // remove blog using react query mutation
  const deleteBlogMutation = useMutation(remove, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
      setNotification({
        message: `Blog has been removed`,
        style: 'success',
      })
      clearNotification(5000)
    },
    onError: error => {
      setNotification({
        message: error.message,
        style: 'error',
      })
      clearNotification(5000)
    },
  })

  const deleteBlogs = async id => {
    deleteBlogMutation.mutate(id)
  }

  if (!loggedIn) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm
          handleSubmit={handleLogin}
          usernameInput={username}
          passwordInput={password}
        />{' '}
      </div>
    )
  }

  if (isLoading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.name} logged in{' '}
        <button type="button" onClick={() => logout()}>
          logout
        </button>
      </div>

      <br />
      <Togglable
        buttonLabel="create new"
        buttonLabel2="cancel"
        ref={blogFormRef}
      >
        <BlogForm addBlog={addBlogs} />
      </Togglable>

      {blogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          update={updateBlogs}
          deleteBlog={deleteBlogs}
          user={user}
        />
      ))}
    </div>
  )
}
export default App
