import blogservice from '../services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, updateBlog } from '../reducers/blogsReducer'
import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'

import { Box, Card, Typography, Button, CardContent, TextField, List, ListItem, ListItemText } from '@mui/material'

const Blog = () => {
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)

  const id = useParams().id
  const blog = blogs.find(b => b.id === id.toString())

  const navigate = useNavigate()

  const handleLike = async () => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    dispatch(updateBlog({ id: blog.id, newBlog }))
    await blogservice.update(blog.id, newBlog)
  }

  const handleRemove = async () => {
    if (window.confirm('are you sure you want to delete ' + blog.title)) {
      await blogservice.deleteBlog(blog.id)
      dispatch(deleteBlog(blog.id))
      navigate('/')
    }
  }

  const handleChange = (event) => {
    setComment(event.target.value)
  }

  const handleComment = async () => {
    const newComments = [...blog.comments, { comment: comment }]

    const newBlog = {
      ...blog,
      comments: newComments
    }
    dispatch(updateBlog({ id: blog.id, newBlog }))
    await blogservice.update(blog.id, newBlog)

    setComment('')
  }

  if (!blog) {
    return null
  }

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant='outlined'>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" >
            {blog.title} {blog.author}
          </Typography>
          <div
            className="peet"
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <a href={blog.url} color="inherit">{blog.url}</a>
            <p>
              {blog.likes.toString()}
              <Button /*data-testid="like" id="like"*/ variant="contained" size="small" onClick={handleLike}>
                like
              </Button>
            </p>
            <Typography variant="body2" color="text.secondary">
              added by {blog.user.username}
            </Typography>
          </div>
          {blog.user.username === user.username && (
            <Button onClick={handleRemove} variant="contained" size="small">
              remove
            </Button>
          )}
          <Typography gutterBottom variant="h5" component="div">
            Comments
          </Typography>
          <div style={{ display: 'flex', gap: '10px' }}>
            <TextField
              type='text'
              value={comment}
              onChange={handleChange}
              id="outlined-basic"
              label="comment.."
              variant="outlined"
              size="small"
              //style={{ width: '300px' }}
            />
            <Button onClick={handleComment} variant="contained" size="small">
              add comment
            </Button>
          </div>
          <List>
            {blog.comments.map((comment) => (
              <ListItem key={comment.id}>
                <ListItemText>{comment.comment}</ListItemText>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  )

  /*return (
    <div>
      <h1>{blog.title} {blog.author}</h1>
      <div
        className="peet"
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <a href={blog.url}>{blog.url}</a>
        <p>
          {blog.likes.toString()}
          <button data-testid="like" id="like" onClick={handleLike}>
              like
          </button>
        </p>
        <p>added by {blog.user.username}</p>
      </div>
      {blog.user.username === user.username && (
        <button onClick={handleRemove}>remove</button>
      )}
      <h2>Comments</h2>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          type='text'
          value={comment}
          onChange={handleChange}
          style={{ width: '300px' }}
        />
        <button onClick={handleComment} style={{ width: '100px' }}>add comment</button>
      </div>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment.id}>{comment.comment}</li>
        ))}
      </ul>
    </div>
  )*/

}



export default Blog
