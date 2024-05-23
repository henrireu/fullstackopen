import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'


export const getAnecdotes = () => 
    axios.get(baseUrl).then(res => res.data)

/*export const createAnecdote = (newAnecdote) =>
    axios.post(baseUrl, newAnecdote).then(res => res.data)*/

export const createNew = async (anecdote) => {
    const response = await axios.post(baseUrl, anecdote)
    return response.data
}

export const voteAnecdote = async (anecdote) => {
  const response = await axios.put(`${baseUrl}/${anecdote.id}/vote`)
  return response.data
}