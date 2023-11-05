import axios from 'axios'
const baseUrl = import.meta.env.VITE_BACKEND_URL

const api = {
  login: async credentials => {
    try {
      const response = await axios.post(`${baseUrl}/login`, credentials)
      return response.data
    } catch (error) {
      throw new Error(error?.response?.data.error)
    }
  },
  getUserData: async () => {
    try {
      const token = window.localStorage.getItem('token')
      if (token) {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        }
        const response = await axios.get(`${baseUrl}/users/get-data`, config)
        return response.data
      }
    } catch (error) {
      throw new Error(error?.response?.data.error)
    }
  },
  fetchAllUsers: async () => {
    try {
      const token = window.localStorage.getItem('token')
      if (token) {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        }
        const response = await axios.get(`${baseUrl}/users`, config)
        return response.data
      }
    } catch (error) {
      throw new Error(error?.response?.data.error)
    }
  },
  fetchResources: async () => {
    try {
      const response = await axios.get(`${baseUrl}/blogs`)
      const sortedBlogs = response.data.sort((a, b) => b.likes - a.likes)
      return sortedBlogs
    } catch (error) {
      throw new Error(error?.response?.data.error)
    }
  },
  create: async resource => {
    try {
      const token = window.localStorage.getItem('token')
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
  },
  update: async resource => {
    try {
      const token = window.localStorage.getItem('token')
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
  },
  remove: async id => {
    try {
      const token = window.localStorage.getItem('token')
      if (token) {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        }
        await axios.delete(`${baseUrl}/blogs/${id}`, config)
      }
    } catch (error) {
      throw new Error(error?.response?.data.error)
    }
  },
  createComment: async resource => {
    try {
      const token = window.localStorage.getItem('token')
      if (token) {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        }
        const response = await axios.post(
          `${baseUrl}/blogs/${resource.blogId}/comments`,
          { text: resource.text },
          config,
        )
        return response.data
      }
    } catch (error) {
      throw new Error(error?.response?.data.error)
    }
  },
}

export default api
