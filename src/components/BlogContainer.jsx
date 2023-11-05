import React from 'react'
import { useUser } from '../context/UserContext'
import BlogList from './BlogList'
import { useMatch } from 'react-router-dom'
import { useField } from '../hooks'

const BlogsContainer = ({
  blogs,
  isLoading,
  blogFormRef,
  deleteBlogs,
  addBlogs,
  updateBlogs,
}) => {
  const { user } = useUser()
  return (
    <>
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
    </>
  )
}

export const SingleBlogInfo = ({ blogs, update, addComment }) => {
  const match = useMatch('/blogs/:id')
  const blogSelected =
    match && blogs?.find(blog => blog.id === match?.params.id)
  return (
    <>
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
          <CommentList blog={blogSelected} addComment={addComment} />
        </>
      ) : null}
    </>
  )
}

const CommentList = ({ blog, addComment }) => {
  const { reset, ...comment } = useField('text')

  const addComments = blog => {
    if (comment.value.trim() === '') {
      return
    }

    addComment({
      text: comment.value,
      blogId: blog.id,
    })
    reset()
  }

  return (
    <>
      <h3>comments</h3>
      <div>
        <input {...comment} placeholder="add comment..." />{' '}
        <button onClick={() => addComments(blog)}>add comment</button>
      </div>
      <ul>
        {blog.comments.length > 0
          ? blog.comments.map(comment => {
              return <li key={comment.id}>{comment.text}</li>
            })
          : null}
      </ul>
    </>
  )
}

export default BlogsContainer
