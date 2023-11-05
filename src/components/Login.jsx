import LoginForm from './LoginForm'
import Notification from './Notification'

const Login = ({ handleLogin, username, password }) => {
  return (
    <div>
      <LoginForm
        handleSubmit={handleLogin}
        usernameInput={username}
        passwordInput={password}
      />{' '}
    </div>
  )
}
export default Login
