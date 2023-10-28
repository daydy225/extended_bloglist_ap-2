import LoginForm from './LoginForm'
import Notification from './Notification'

const Login = ({ handleLogin, username, password }) => {
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
export default Login
