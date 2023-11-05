import { useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import { useField } from './hooks'
import { useNotification } from './context/NotificationContext'
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query'
import { useUser } from './context/UserContext'
import BlogList from './components/BlogList'
import api from './api'
import { User, UsersContainer } from './components/Users'
import { Link, Navigate, Route, Routes, useMatch } from 'react-router-dom'
import Login from './components/Login'
import BlogsContainer, { SingleBlogInfo } from './components/BlogContainer'
import NavMenu from './components/NavMenu'

const App = () => {
  const queryClient = useQueryClient()
  // const baseUrl = import.meta.env.VITE_BACKEND_URL
  const username = useField('text')
  const password = useField('password')
  const { setNotification, clearNotification } = useNotification()

  const { login, loggedIn } = useUser()

  // const { fetchResources, create, update, remove } = useResource(baseUrl)

  // React query for fetching blogs
  const { data: blogs, isLoading: isBlogsLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: api.fetchResources,
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
  const createBlogMutation = useMutation(api.create, {
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
  const updateBlogMutation = useMutation(api.update, {
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
  const deleteBlogMutation = useMutation(api.create, {
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

  // if (isUserloading) {
  //   return <div>loading...</div>
  // }

  const match = useMatch('/users/:id')
  const userSelected =
    match && users?.find(user => user.id === match?.params.id)

  return (
    <>
      <Notification />
      <NavMenu />
      <h1>blog app</h1>
      <Routes>
        <Route
          path="/users/:id"
          element={<User userSelected={userSelected} />}
        />
        <Route
          path="/blogs/:id"
          element={
            loggedIn ? (
              <SingleBlogInfo blogs={blogs} update={updateBlogs} />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route
          path="/"
          element={
            loggedIn ? (
              <BlogsContainer
                blogs={blogs}
                isLoading={isBlogsLoading}
                addBlogs={addBlogs}
                blogFormRef={blogFormRef}
                deleteBlogs={deleteBlogs}
                updateBlogs={updateBlogs}
              />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route
          path="/users"
          element={<UsersContainer users={users} isLoading={isUserloading} />}
        />
        <Route
          path="/login"
          element={
            !loggedIn ? (
              <Login
                handleLogin={handleLogin}
                username={username}
                password={password}
              />
            ) : (
              <Navigate replace to="/" />
            )
          }
        />
      </Routes>
    </>
  )
}

export default App
