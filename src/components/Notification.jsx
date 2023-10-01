/* eslint-disable linebreak-style */

import { useNotification } from '../context/NotificationContext'

const Notification = () => {
  const { notification } = useNotification()
  if (!notification) {
    return null
  }

  return (
    <div className={notification.style === 'error' ? 'error' : 'success'}>
      {notification.message}
    </div>
  )
}

export default Notification
