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
import BlogList from './components/BlogList'
import api from './api'
import User from './components/Users'
import { Navigate, Route, Routes } from 'react-router-dom'
import Users from './components/Users'
import Login from './components/Login'

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
  // React query for fetching all users
  const { data: users, isLoading: isUserloading } = useQuery({
    queryKey: ['users'],
    queryFn: api.fetchAllUsers,
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

  console.log('loggedIn', loggedIn)

  if (isUserloading) {
    return <div>loading...</div>
  }

  return (
    <Routes>
      <Route
        path="/users"
        element={
          loggedIn ? (
            <Users
              users={users}
              user={user}
              isLoading={isUserloading}
              logout={logout}
            />
          ) : (
            <Navigate replace to="/" />
          )
        }
      />
      <Route
        path="/"
        element={
          !loggedIn ? (
            <Login
              handleLogin={handleLogin}
              username={username}
              password={password}
            />
          ) : (
            <Navigate replace to="/users" />
          )
        }
      />
    </Routes>
  )
}

export default App
