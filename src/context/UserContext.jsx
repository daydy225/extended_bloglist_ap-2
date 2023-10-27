import { useReducer, useContext, createContext, useEffect } from 'react'
import api from '../api'
export const UserContext = createContext(null)

// Define initial state and user reducer
const initialState = {
  user: null,
  loggedIn: false,
}

const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.user, loggedIn: true }
    case 'LOGOUT':
      return { user: null, loggedIn: false }
    default:
      return state
  }
}

// Create a UserContextProvider component
export const UserContextProvider = ({ children }) => {
  const [userState, userDispatch] = useReducer(userReducer, initialState)

  // Load user data from local storage, if available
  useEffect(() => {
    const storedUserData = localStorage.getItem('userData')
    if (storedUserData) {
      const userData = JSON.parse(storedUserData)
      userDispatch({ type: 'LOGIN', user: userData })
    }
  }, [])

  const authService = {
    login: async credentials => {
      try {
        // Replace this with your actual login logic
        const { token } = await api.login(credentials) // Assuming you have an API service for login

        // Store the token in local storage
        localStorage.setItem('token', token)
        const user = await api.getUserData()

        localStorage.setItem('userData', JSON.stringify(user))

        // Set the user data in the state
        //

        userDispatch({ type: 'LOGIN', user })
      } catch (error) {
        throw error
      }
    },
    logout: async () => {
      try {
        // Remove the token and user data from local storage
        localStorage.removeItem('token')
        localStorage.removeItem('userData')

        userDispatch({ type: 'LOGOUT' })
      } catch (error) {
        throw error
      }
    },
  }

  return (
    <UserContext.Provider value={{ userState, userDispatch, authService }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const { userState, authService } = useContext(UserContext)

  return {
    user: userState.user,
    loggedIn: userState.loggedIn,
    login: authService.login,
    logout: authService.logout,
  }
}
