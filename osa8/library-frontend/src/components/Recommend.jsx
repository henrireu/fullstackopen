import { ME_QUERY, ALL_BOOKS_BY_GENRE } from "../queries"
import { useQuery } from "@apollo/client"

const Recommend = () => {
    const meQuery = useQuery(ME_QUERY)

    if(meQuery.loading) {
        return <div>loading...</div>
    }

    if (meQuery.data.me.favoriteGenre === null) {
        return ( 
          <>
           <h2>You dont have favourite genre</h2>
          </>
        )
    }

    if (meQuery.data.me.favoriteGenre !== null) {
        return (
            <RecommendedBooks genre={meQuery.data.me.favoriteGenre} />
        )
    }
}

const RecommendedBooks = ( {genre} ) => {
    const genrebooks = useQuery(ALL_BOOKS_BY_GENRE, {
        variables: { genre }
    })

    if (genrebooks.loading) return <div>loading..</div>

    return (
        <div>
          <h2>Recommendations</h2>
          <p>books in your favourite genre <strong>{genre}</strong></p>
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
        </div>
    )
}

export default Recommend