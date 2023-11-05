/* eslint-disable linebreak-style */
import { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = ({ blog, update, deleteBlog, user }) => {
  // const [blogVisible, setBlogVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  // const handleView = () => {
  //   setBlogVisible(!blogVisible)
  // }

  const deleteABlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle} data-test="blogs">
      <div className="blogTitle">
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
        {/* <button onClick={handleView}>{blogVisible ? 'hide' : 'view'}</button> */}
      </div>

      <div style={{ display: 'none' }} className="blogContent">
        <div>{blog.url}</div>
        <div data-test="like-count">
          likes
          {blog.likes} <button onClick={() => update(blog)}>like</button>
        </div>
        <div data-test="blog-author">{blog.user.name}</div>
        {blog.user.name === user.name ? (
          <button onClick={deleteABlog}>remove</button>
        ) : null}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blog
