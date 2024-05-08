import { useState, useEffect } from 'react'

import Blog from './Blog'


const Blogs = ({ blogs, user, setUser, deleteBlog }) => {
  const [thisBlogs, setThisBlogs] = useState([])

  useEffect(() => {
    setThisBlogs(blogs)
  },[blogs])

  const addBlog = (blog) => {
    const newBlogs = thisBlogs.concat(blog)
    setThisBlogs(newBlogs)
  }

  const handleLogOut = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <div>
      <button data-testid='logout' onClick={() => handleLogOut()}>Log out</button>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      {thisBlogs.sort((a, b) => b.likes - a.likes).map(blog => {
        /*if(blog.user) {
          return <Blog key={blog.id} blog={blog} user={user} deleteBlog={deleteBlog}/>
        }*/
        return <Blog key={blog.id} blog={blog} user={user} deleteBlog={deleteBlog}/>
        //return null
      })}
    </div>
  )

}

export default Blogs