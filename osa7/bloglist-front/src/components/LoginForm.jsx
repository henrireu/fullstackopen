import { useSelector, useDispatch } from 'react-redux'
import Message from './Message'
import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setUser2 } from '../reducers/userReducer'
import { setMessage } from '../reducers/messageReducer'
import { useNavigate } from 'react-router-dom'

import { Box, Button, TextField, Typography, Alert } from '@mui/material'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('user', JSON.stringify(user))
      blogService.setToken(user.token)

      dispatch(setUser2(user))

      setUsername('')
      setPassword('')
      navigate('/')
    } catch (exception) {
      dispatch(setMessage({ color: 'red', message: 'wrong username or password' }))
      setTimeout(() => {
        dispatch(setMessage({ color: null, message: null }))
      }, 5000)
    }
  }

  if (user.username === null) {
    return (
      <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Log in to application
        </Typography>
        <Message />
        <form data-testid="loginform" onSubmit={handleLogin}>
          <Box sx={{ mb: 2 }}>
            <TextField
              data-testid="username"
              label="Username"
              type="text"
              fullWidth
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              variant="outlined"
              margin="normal"
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              data-testid="password"
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              variant="outlined"
              margin="normal"
            />
          </Box>
          <Button data-testid="loginbutton" type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </form>
      </Box>
    )
  }

}

export default LoginForm