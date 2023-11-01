import React from 'react'
import Notification from './Notification'
import { Link } from 'react-router-dom'
import { useUser } from '../context/UserContext'

export const UsersContainer = ({ users, isLoading }) => {
  const { user, logout } = useUser()
  return (
    <>
      <LoggedContainer user={user} logout={logout} />
      <h2>Users</h2>
      {isLoading ? <div>loading...</div> : <UserTable users={users} />}
    </>
  )
}

export const UserTable = ({ users }) => {
  return (
    <>
      <table
        style={{
          borderCollapse: 'collapse',
        }}
      >
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users?.map(user => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export const User = ({ userSelected }) => {
  const { user, logout } = useUser()

  return (
    <>
      <LoggedContainer user={user} logout={logout} />
      <h2>{user?.name}</h2>
      <h4>added blogs</h4>
      <ul>
        {userSelected?.blogs.length === 0 && <li>no blogs added</li>}
        {userSelected?.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  )
}

const LoggedContainer = ({ user, logout }) => {
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
