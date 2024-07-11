import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { setBlogs2 } from './reducers/blogsReducer'
import { setUser2 } from './reducers/userReducer'
import { GetAllUsers } from './services/users'
import { setUsers } from './reducers/allUsersReducer'
import Users from './components/Users'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import NavigationBar from './components/NavigationBar'
import LoginForm from './components/LoginForm'
import User from './components/User'
import Blog from './components/Blog'

import { Container } from '@mui/material'

const App = () => {
  const dispatch = useDispatch()

  const user2 = useSelector((state) => state.user)

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('user')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      dispatch(setUser2(user))

      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(setBlogs2(blogs)))
  }, [dispatch])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await GetAllUsers()
        dispatch(setUsers(users))
      } catch (error) {
        console.error(error)
      }
    }
    fetchUsers()
  }, [])


  return (
    <Container>
      <Router>
        <NavigationBar />

        <Routes>
          <Route path='/users/:id' element={<User />} />
          <Route path='/blogs/:id' element={<Blog />} />

          <Route path='/blogs' element={<Blogs />} />
          <Route path='/users' element={<Users />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/' element={<Blogs />} />
        </Routes>
      </Router>
    </Container>
  )
}

export default App
