import { useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import { useAuth, useField, useResource } from './hooks'
import { useNotification } from './context/NotificationContext'
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query'

const App = () => {
  const queryClient = useQueryClient()
  const baseUrl = import.meta.env.VITE_BACKEND_URL
  const username = useField('text')
  const password = useField('password')
  const { setNotification, clearNotification } = useNotification()

  const [user, authService] = useAuth(baseUrl)
  const { fetchResources, create } = useResource(baseUrl)

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
      await authService.login(username.value, password.value)
      setNotification({
        message: 'logged in successfully',
        style: 'success',
      })
      clearNotification(5000)
    } catch (error) {
      setNotification({
        message: error.message,
        style: 'error',
      })
      clearNotification(5000)
    } finally {
      username.reset()
      password.reset()
    }
  }

  const blogFormRef = useRef()
  // add blog using react query mutation
  const createAnecdoteMutation = useMutation(create, {
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
    createAnecdoteMutation.mutate(newObject)
  }

  const updateBlogs = (id, newObject) => blogsService.update(id, newObject)

  const deleteBlogs = async id => {
    try {
      await blogsService.remove(id)
      setNotification({
        message: `Blog has been removed`,
        style: 'success',
      })
      clearNotification(5000)
    } catch (error) {
      setNotification({
        message: error.message,
        style: 'error',
      })
      clearNotification(5000)
    }
  }

  const logout = event => {
    event.preventDefault()
    authService.logout()
    window.location.reload()
  }

  if (user === null) {
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
        {user.name} logged in
        <button type="button" onClick={logout}>
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
