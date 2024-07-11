import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setUser2 } from '../reducers/userReducer'

import { AppBar, Toolbar, Button } from '@mui/material'

const NavigationBar = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleLogOut = () => {
    localStorage.removeItem('user')
    dispatch(setUser2({ username: null, password: null }))
  }

  return (
    <AppBar position='static'>
      <Toolbar>
        <Button color='inherit' component={Link} to='/blogs'>
          Blogs
        </Button>
        <Button color='inherit' component={Link} to='/users'>
          Users
        </Button>

        {user.username === null ? (
          <Button color='inherit' component={Link} to='/login'>
              login
          </Button>
        ) : (
          <div>
            <em>{user.username} logged in</em>
            <Button color='inherit' onClick={handleLogOut}>
              Logout
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  )

}

export default NavigationBar