import React from 'react'
import Blog from './Blog'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

const BlogList = ({
  blogs,
  user,
  addBlogs,
  updateBlogs,
  deleteBlogs,
  blogFormRef,
}) => {
  return (
    <>
      <Togglable
        buttonLabel="create new"
        buttonLabel2="cancel"
        ref={blogFormRef}
      >
        <BlogForm addBlog={addBlogs} />
      </Togglable>
      {blogs?.map(blog => (
        <Blog
          key={blog?.id}
          blog={blog}
          update={updateBlogs}
          deleteBlog={deleteBlogs}
          user={user}
        />
      ))}
    </>
  )
}

export default BlogList
