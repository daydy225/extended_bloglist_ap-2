import React from 'react'
import Notification from './Notification'

const Users = ({ isLoading, users, user, logout }) => {
  return (
    <>
      <h2>blogs</h2>
      <Notification />
      <p>{user.name} logged in</p>
      <button type="button" onClick={() => logout()}>
        logout
      </button>
      <h2>Users</h2>
      {isLoading ? (
        <div>loading...</div>
      ) : (
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
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}

export default Users
