import { Link } from 'react-router-dom'
import { useUser } from '../context/UserContext'

const NavMenu = () => {
  const { user, logout } = useUser()

  return (
    <div
      style={{
        width: '100%',
        backgroundColor: '#d3d3d3',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <span>
        <Link to="/">blogs</Link>
      </span>
      <span style={{ marginLeft: '0.3rem', marginRight: '0.3rem' }}>
        <Link to="/users">users</Link>
      </span>
      <LoggedContainer user={user} logout={logout} />
    </div>
  )
}

const LoggedContainer = ({ user, logout }) => {
  return (
    <>
      <span>
        {user?.name} logged in{' '}
        <button type="button" onClick={() => logout()}>
          logout
        </button>
      </span>
    </>
  )
}

export default NavMenu
