import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'

import { LOGIN } from "../queries"

const Login = ( {setToken, setPage } ) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      console.error(error)
    }
  })

  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
      setPage("authors")
    }
  }, [result.data])

  const submit = (event) => {
    event.preventDefault()

    setUsername('')
    setPassword('')
    login({ variables: { username, password } })
  }

  return (
    <div>
      <form onSubmit={submit}>
        <h3>Login form</h3>
        <div>
          username:
          <input type="text" value={username} onChange={ (event) => setUsername(event.target.value) } />
        </div>
        <div>
          password:
          <input type="password" value={password} onChange={ (event) => setPassword(event.target.value) } />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login