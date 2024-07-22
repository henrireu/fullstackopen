import { useState } from "react"
import { ALL_AUTHORS, EDIT_BORN } from '../queries'
import { useMutation } from '@apollo/client'

const Authors = ({ authors, token }) => {

  if (!authors) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {token !== null && (
        <AddBirthYear authors={authors}/>
      )}
    </div>
  )
}

const AddBirthYear = ({ authors }) => {
  const [name, setName] = useState(authors.length > 0 ? authors[0].name : '')
  const [year, setYear] = useState('')

  const [ changeYear ] = useMutation(EDIT_BORN, {
    refetchQueries: [ { query: ALL_AUTHORS } ],
    onError: (error) => {
      console.log('error: ', error)
    }
  })

  const submit = (event) => {
    event.preventDefault()

    const setBornTo = parseInt(year)

    changeYear({ variables: { name, setBornTo } })
  }

  const handleChange = (event) => {
    setName(event.target.value)
  }

  return (
    <div>
      <h2>Set birth year</h2>
      <form onSubmit={submit}>
        <select onChange={handleChange}>
          {authors.map((author) => (
            <option 
            key={author.name} 
            value={author.name}
            >
              {author.name}
            </option>
          ))}
        </select>
        <div>
          born 
          <input
            value={year}
            onChange={(event) => setYear(event.target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors
