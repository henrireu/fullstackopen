import { useState } from 'react'
import GetUserId from '../services/users'
import blogService from '../services/blogs'

const AddBlog = ({ blogs ,setBlogs, user, addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState(null)

  const [showForm, setShowForm] = useState(false)

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      const userId = await GetUserId(user.username)
      const newBlog = {
        title: title,
        author: author,
        url: url,
        userId: userId
      }
      blogService.create(newBlog)
      console.log(newBlog)
      //setBlogs(blogs.concat(newBlog))
      addBlog(newBlog)

      setMessage('a new blog ' + title + ' by ' + author)
      setTitle('')
      setAuthor('')
      setUrl('')
      setShowForm(false)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      console.error('Error creating blog:', error)
    }
  }

  return (
    <div>
      <h2 className="message">{message}</h2>
      <h2>create new</h2>
      {!showForm ? (
        <button style={{ height: '40px' }} onClick={() => setShowForm(true)} data-testid='newblog'>New blog</button>
      ) : (
        <form onSubmit={handleCreate}>
          <div className="newblog">
            <div>
              title: <input
                data-testid='title'
                type = 'text'
                value = {title}
                name = 'Title'
                onChange = {({ target }) => setTitle(target.value)}
              />
            </div>
            <div>
              author: <input
                data-testid='author'
                type = 'text'
                value = {author}
                name = 'Author'
                onChange = {({ target }) => setAuthor(target.value)}
              />
            </div>
            <div>
              url: <input
                data-testid='url'
                type = 'text'
                value = {url}
                name = 'Url'
                onChange = {({ target }) => setUrl(target.value)}
              />
            </div>
          </div>
          <button data-testid='create' type="submit">create</button>
          <button onClick={() => setShowForm(false)}>Takaisin</button>
        </form>
      )}
    </div>
  )
}

export default AddBlog