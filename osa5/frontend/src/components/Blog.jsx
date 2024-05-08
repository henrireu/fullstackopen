import { useState, useEffect } from 'react'
import blogservice from '../services/blogs'

import PropTypes from 'prop-types'

const Blog = ({ blog, user, deleteBlog }) => {
  const [showAll, setShowAll] = useState(false)
  const [thisblog, setThisBlog] = useState()


  useEffect(() => {
    setThisBlog(blog)
  },[blog])

  const handleLike = async () => {
    const newBlog = {
      ...thisblog,
      likes: thisblog.likes + 1
    }
    setThisBlog(newBlog)
    await blogservice.update(blog.id, newBlog)
  }

  const handleRemove = async () => {
    if (window.confirm('are you sure you want to delete ' + thisblog.title)) {
      /*try {
        await blogservice.deleteBlog(thisblog.id)
        setThisBlog()
      } catch (error){
        throw error
      }*/
      await blogservice.deleteBlog(thisblog.id)
      deleteBlog(thisblog.id)
      setThisBlog()
    }
  }

  if (!thisblog) { return ( <></>)}

  if (showAll) {
    return (
      <div className="box">
        {thisblog.title} {thisblog.author}
        <button style={{ height: '20px' }} onClick={() => setShowAll(false)}>hide</button>
        <div className='peet' style={{ display: 'flex', flexDirection: 'column' }}>
          <p>{blog.url}</p>
          <p>{thisblog.likes.toString()}<button data-testid='like' id='like' onClick={handleLike}>like</button></p>
          <p>{blog.user.username}</p>
        </div>
        {blog.user.username === user.username && (
          <button onClick={handleRemove}>remove</button>
        )}
      </div>
    )
  }

  return (
    <div className="box">
      {blog.title} {blog.author}
      <button data-testid='show' id='show' style={{ height: '20px' }} onClick={() => setShowAll(true)}>show</button>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog