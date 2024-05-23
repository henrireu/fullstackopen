import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { createNew } from '../requests'

import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const AnecdoteForm = () => {
  const [notification, dispatch] = useContext(NotificationContext)

  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({
    mutationFn: createNew,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log(content)

    const newAnecdote = {
      content: content,
      id: (100000 * Math.random()).toFixed(0),
      votes: 0
    }
    if (content.length > 4) {
      newAnecdoteMutation.mutate(newAnecdote)
    }
    if (content.length  < 5) {
      dispatch({ type: "NOTIFICATION", payload: 'too short anecdote, must have length 5 or more'})
      setTimeout(() => {
        dispatch({ type: "NOTIFICATION", payload: '' })
      }, 5000)
    }
    
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
