import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

import { vote as voteAction } from '../reducers/anecdoteReducer'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import Notification from './Notification'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const notification = useSelector(state => state.notification)
  const filter = useSelector(state => state.filter) 
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setFilter(filter))
  }, [dispatch, filter])

  const vote = (id) => {
    dispatch(voteAction({ id }))
    const anecdote = anecdotes.filter(a => a.id === id)
    dispatch(voteAnecdote(anecdote[0]))
    console.log(anecdote[0].content)

    dispatch(setNotification(`you voted '${anecdote[0].content}'`, 2))
  }

  let filteredAnecdotes = anecdotes
  if (filter !== '') {
    filteredAnecdotes = filteredAnecdotes.filter(anecdote => anecdote.content.includes(filter))
  }

  const sortedAnecdotes = [...filteredAnecdotes].sort((a, b) => b.votes - a.votes)

  return (
    <>
    {notification !== '' && (
      <Notification />
    )}
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList