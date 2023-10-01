import { useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import { useAuth, useField, useResource } from './hooks'
import { useNotification } from './context/NotificationContext'

const App = () => {
  const baseUrl = import.meta.env.VITE_BACKEND_URL
  const username = useField('text')
  const password = useField('password')
  const { setNotification, clearNotification } = useNotification()

  const [user, authService] = useAuth(baseUrl)
  const [blogs, blogsService] = useResource(baseUrl)

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
  const addBlogs = async newObject => {
    blogFormRef.current.toggleVisibility()
    try {
      await blogsService.create(newObject)
      setNotification({
        message: `A new blog ${newObject.title} by ${newObject.author} added`,
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
