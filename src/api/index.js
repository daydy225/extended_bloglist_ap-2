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
}

export default api
