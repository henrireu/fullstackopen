import { useState, useEffect } from "react"
import { useQuery } from "@apollo/client"

import { ALL_GENRES, ALL_BOOKS_BY_GENRE } from "../queries"

const Books = ({ books }) => {
  const [genre, setGenre] = useState('all')

  const genresResult = useQuery(ALL_GENRES)

  if (!books) {
    return null
  }

  if (genresResult.loading) {
    return <div>loading...</div>
  }

  const handleButton = () => {
    setGenre('all')
  }

  return ( 
    <div>
      <h2>books</h2>
      <div>
        <button onClick={handleButton}>all</button>
        {genresResult && (
          <>
            {genresResult.data.allGenres.map((genre) => (
              <button key={genre} onClick={() => setGenre(genre)}>{genre}</button>
            ))}
          </>
        )}
      </div>
      <h3>genre: {genre}</h3>
      <BooksByGenre books={books} genre={genre}/>
    </div>
  )
}

const BooksByGenre = ( {books, genre} ) => {

  const genrebooks = useQuery(ALL_BOOKS_BY_GENRE, {
    variables: { genre }
  })

  if (genrebooks.loading) {
    return <div>loading...</div>
  }

  if (genre === 'all') {
    return (
      <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {books.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
    )
  } else {
    return (
      <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {genrebooks.data.allBooks.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
    )
  }
  
}


export default Books
