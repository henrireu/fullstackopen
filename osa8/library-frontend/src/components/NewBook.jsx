import { useState } from 'react'
import { ALL_BOOKS, CREATE_BOOK } from '../queries'
import { useMutation } from '@apollo/client'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published2, setPublished2] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  /*const [ createBook ] = useMutation(CREATE_BOOK, {
    refetchQueries: [ { query: ALL_BOOKS, ALL_GENRES } ],
    onError: (error) => {
      console.log('error: ', error)
    }
  })*/
    const [ createBook ] = useMutation(CREATE_BOOK, {
      onError: (error) => {
        console.log('error: ', error)
      },
      update: (cache, response) => {
        cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
          return {
            allBooks: allBooks.concat(response.data.addBook)
          }
        })
      },
    })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    const published = parseInt(published2)

    try {
      await createBook({ variables: { title, published: published, author, genres } })
      setTitle('')
      setPublished2('')
      setAuthor('')
      setGenres([])
      setGenre('')
    } catch (error) {
      console.error('Error creating book:', error)
    }
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published2}
            onChange={({ target }) => setPublished2(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook