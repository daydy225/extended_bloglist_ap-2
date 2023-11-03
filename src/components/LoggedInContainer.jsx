import Notification from './Notification'

export const LoggedContainer = ({ user, logout }) => {
  return (
    <>
      <h2>blogs</h2>
      <Notification />
      <p>{user?.name} logged in</p>
      <button type="button" onClick={() => logout()}>
        logout
      </button>
    </>
  )
}
