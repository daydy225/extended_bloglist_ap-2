import { useEffect, useState } from 'react'

import axios from 'axios'

export const useField = type => {
  const [value, setValue] = useState('')

  const onChange = event => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset,
  }
}

export const useResource = baseUrl => {
  // const [resources, setResources] = useState([])

  // useEffect(() => {
  //   const fetchResources = async () => {
  //     try {
  //       const response = await axios.get(`${baseUrl}/blogs`)
  //       const sortedBlogs = response.data.sort((a, b) => b.likes - a.likes)
  //       setResources(sortedBlogs)
  //     } catch (error) {
  //       throw new Error(error?.response?.data.error)
  //     }
  //   }

  //   fetchResources()
  // }, [baseUrl])

  const fetchResources = async () => {
    try {
      const response = await axios.get(`${baseUrl}/blogs`)
      const sortedBlogs = response.data.sort((a, b) => b.likes - a.likes)
      return sortedBlogs
    } catch (error) {
      throw new Error(error?.response?.data.error)
    }
  }

  const create = async resource => {
    try {
      const token = window.localStorage.getItem('loggedUserBlogApp')
      if (token) {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        }
        const response = await axios.post(`${baseUrl}/blogs`, resource, config)
        return response.data
      }
    } catch (error) {
      throw new Error(error?.response?.data.error)
    }
  }

  const update = async resource => {
    try {
      const token = window.localStorage.getItem('loggedUserBlogApp')
      if (token) {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        }

        const response = await axios.put(
          `${baseUrl}/blogs/${resource.id}`,
          resource,
          config,
        )

        return response.data
      }
    } catch (error) {
      throw new Error(error?.response?.data.error)
    }
  }

  const remove = async id => {
    try {
      const token = window.localStorage.getItem('loggedUserBlogApp')
      if (token) {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        }
        await axios.delete(`${baseUrl}/blogs/${id}`, config)
      }
    } catch (error) {
      throw new Error(error?.response?.data.error)
    }
  }

  return { fetchResources, create, update, remove }
}

// make hook to authenticate user
export const useAuth = baseUrl => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = window.localStorage.getItem('loggedUserBlogApp')
        if (token) {
          const config = {
            headers: { Authorization: `Bearer ${token}` },
          }
          const response = await axios.get(`${baseUrl}/users/get-data`, config)
          setUser(response.data)
        }
      } catch (error) {
        throw new Error(error?.response?.data.error)
      }
    }

    fetchUser()
  }, [])

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${baseUrl}/login`, {
        username,
        password,
      })

      window.localStorage.setItem('loggedUserBlogApp', response.data.token)
      setUser(response.data)
    } catch (error) {
      throw new Error(error?.response?.data.error)
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedUserBlogApp')
    setUser(null)
  }

  const service = {
    login,
    logout,
  }

  return [user, service]
}
