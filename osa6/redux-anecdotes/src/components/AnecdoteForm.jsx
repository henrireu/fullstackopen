import { useState } from 'react'
import { useDispatch } from 'react-redux'
//import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNewAnecdote } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdoteService'

const AnecdoteForm = () => {
    const [text, setText] = useState('')

    const dispatch = useDispatch()

    const handleCreate = async () => {
        event.preventDefault()
        console.log(text)
        dispatch(createNewAnecdote(text))
       // dispatch({ type: 'CREATE', text})
       /*const newAnecdote = await anecdoteService.createNew(text)
       dispatch(createAnecdote(text))*/
    }

    return (
        <div>
            <form onSubmit={handleCreate}>
              <input
                value={text}
                onChange={(e) => setText(e.target.value)} 
              />
              <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm