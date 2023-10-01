import { useReducer, useContext, createContext } from 'react'

export const NotificationContext = createContext(null)

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return {
        message: action.notification.message,
        style: action.notification.style,
      }
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state
  }
}

export const useNotification = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext)

  const setNotification = notification => {
    notificationDispatch({
      type: 'SET_NOTIFICATION',
      notification,
    })
  }

  const clearNotification = time => {
    setTimeout(() => {
      notificationDispatch({
        type: 'CLEAR_NOTIFICATION',
      })
    }, time)
  }

  return {
    notification,
    setNotification,
    clearNotification,
  }
}

export const NotificationContextProvider = props => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null,
  )
  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}
