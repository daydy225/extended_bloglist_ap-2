import React from 'react'
import { LoggedContainer } from './LoggedInContainer'
import { useUser } from '../context/UserContext'
import BlogList from './BlogList'
import { useMatch } from 'react-router-dom'

const BlogsContainer = ({
  blogs,
  isLoading,
  blogFormRef,
  deleteBlogs,
  addBlogs,
  updateBlogs,
}) => {
  const { user, logout } = useUser()
  return (
    <>
      <LoggedContainer user={user} logout={logout} />
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <BlogList
          blogs={blogs}
          blogFormRef={blogFormRef}
          addBlogs={addBlogs}
          deleteBlogs={deleteBlogs}
          updateBlogs={updateBlogs}
          user={user}
        />
      )}
      {/* <div>BlogContainer</div> */}
    </>
  )
}

export const SingleBlogInfo = ({ blogs, update }) => {
  const { user, logout } = useUser()
  const match = useMatch('/blogs/:id')
  const blogSelected =
    match && blogs?.find(blog => blog.id === match?.params.id)
  return (
    <>
      <LoggedContainer user={user} logout={logout} />
      {blogSelected ? (
        <>
          <h2>{blogSelected.title}</h2>
          <p>
            <a
              href={blogSelected.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {blogSelected.url}
            </a>
            <br /> {blogSelected.likes}
            {' likes'}
            <button onClick={() => update(blogSelected)}>like</button>
            <br />
            added by {blogSelected.author}
          </p>
        </>
      ) : null}
    </>
  )
}

export default BlogsContainer
