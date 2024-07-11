import { useState } from 'react'
import GetUserId from '../services/users'
import blogService from '../services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { setMessage } from '../reducers/messageReducer'
import Message from './Message'
import { addBlog2, setBlogs2 } from '../reducers/blogsReducer'

import { Box, Button, TextField, Typography } from '@mui/material'

const AddBlog = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [showForm, setShowForm] = useState(false)

  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      const userId = await GetUserId(user.username)
      const newBlog = {
        title: title,
        author: author,
        url: url,
        userId: userId,
        likes: 0,
        //
        comments: []
      }
      blogService.create(newBlog)
      console.log(newBlog)
      dispatch(addBlog2(newBlog))

      const themessage = 'a new blog ' + title + ' by ' + author
      dispatch(setMessage({ color: 'green', message: themessage }))

      setTitle('')
      setAuthor('')
      setUrl('')
      setShowForm(false)
      setTimeout(() => {
        dispatch(setMessage({ color: null, message: null }))
      }, 5000)

    } catch (error) {
      console.error('Error creating blog:', error)
    }
  }

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 3 }}>
      <Message />
      {!showForm ? (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowForm(true)}
          data-testid="newblog"
          fullWidth
        >
          Create New
        </Button>
      ) : (
        <form onSubmit={handleCreate}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" component="div">
              Create New Blog
            </Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              label="Title"
              data-testid="title"
              type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
              fullWidth
              variant="outlined"
              margin="normal"
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              label="Author"
              data-testid="author"
              type="text"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
              fullWidth
              variant="outlined"
              margin="normal"
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              label="URL"
              data-testid="url"
              type="text"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
              fullWidth
              variant="outlined"
              margin="normal"
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button data-testid="create" type="submit" variant="contained" color="primary">
              Create
            </Button>
            <Button onClick={() => setShowForm(false)} variant="outlined" color="secondary">
              Cancel
            </Button>
          </Box>
        </form>
      )}
    </Box>
  )

}

export default AddBlog
