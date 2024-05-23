import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

//const initialState = anecdotesAtStart.map(asObject) 
const initialState = []

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    vote(state, action) {
      const id = action.payload.id;
      const anecdote = state.find(a => a.id === id);
      if (anecdote) {
        anecdote.votes += 1;
      }
    },
    createAnecdote(state, action) {
      state.push(asObject(action.payload))
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { vote, createAnecdote, setAnecdotes } = anecdotesSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createNewAnecdote = anecdote => {
  return async dispatch => {
    await anecdoteService.createNew(anecdote)
    dispatch(createAnecdote(anecdote))
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    await anecdoteService.voteAnecdote(anecdote)
    dispatch(vote(anecdote.id))
  }
} 



export default anecdotesSlice.reducer