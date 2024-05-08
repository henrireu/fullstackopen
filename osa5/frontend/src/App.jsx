import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import AddBlog from './components/AddBlog'
import blogService from './services/blogs'
import loginService from './services/login'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  useEffect(() => {
    const loggedUser = window.localStorage.getItem('user')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'user', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <h2 className="errormessage">{errorMessage}</h2>
      <form data-testid='loginform' onSubmit={handleLogin}>
        <div>
        username
          <input
            data-testid='username'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
        password
          <input
            data-testid='password'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button data-testid='loginbutton' type="submit">login</button>
      </form>
    </div>
  )

  const addBlog = (newBlog) => {
    setBlogs(blogs.concat(newBlog))
  }

  const testi = () => {
    console.log(blogs)
  }

  const logOut = () => {

  }

  const updateBlog = (id, newBlog) => {
    const newBlogs = []
    for (let x = 0; x < blogs.length; x++) {
      if (blogs.id === id) {
        newBlogs.push(newBlog)
      } else {
        newBlogs.push(blogs[x])
      }
    }
    setBlogs(newBlogs)
  }

  const deleteBlog = (id) => {
    const newBlogs = blogs.filter(blog => blog.id !== id)
    setBlogs(newBlogs)
  }

  return (
    <div>
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <Blogs blogs={blogs} user={user} setUser={setUser} updateBlog={updateBlog} deleteBlog={deleteBlog}/>
          <AddBlog  blogs={blogs} setBlogs={setBlogs} user={user} addBlog={addBlog}/>
        </div>
      )}

      {/*<button onClick={() => testi()}>testi</button>*/}

    </div>
  )
}

{/*<div>
          <button onClick={() => logOut()}>Log out</button>
          <h2>blogs</h2>
          <p>{user.username} has logged in</p>
          {blogs.map(blog => {
            if(blog.user) {
              if (user.username === blog.user.username) {
                return <p key={blog.id}>{blog.title} {blog.author} </p>
              }
            }
            return null
          })}
        </div>*/}

export default App