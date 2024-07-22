import { useState } from "react"
import { ALL_BOOKS, ALL_AUTHORS, BOOK_ADDED } from "./queries"
import { useQuery, useApolloClient, useSubscription } from "@apollo/client"

import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import Login from "./components/Login"
import Recommend from "./components/Recommend"

const App = () => {
  const [page, setPage] = useState("authors")
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const authorResult = useQuery(ALL_AUTHORS)
  const bookResult = useQuery(ALL_BOOKS)

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      window.alert(`new book ${addedBook.title} arrived to library`)
    }
  })

  if (authorResult.loading) {
    return <div>loading...</div>
  }
  if (bookResult.loading) {
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token !== null ? (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      {page === "authors" ? (
        <Authors show={page === "authors"} authors={authorResult.data.allAuthors} token={token}/>
      ) : page === "books" ? (
        <Books show={page === "books"} books={bookResult.data.allBooks}/>
      ) : page === "add" ? (
        <NewBook show={page === "add"} />
      ) : page === "login" ? (
        <Login setToken={setToken} setPage={setPage}/>
      ) : page === "recommend" ? (
        <Recommend />
      ) : (
        <></>
      )}

    </div>
  );
};

export default App;
