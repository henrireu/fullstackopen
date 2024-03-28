import { useState } from 'react'

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
  'The only way to go fast, is to go well.'
]

const lista = [];

for(let x = 0; x < anecdotes.length; x++) {
  lista.push(0);
}

const App = () => {
  
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(lista)
  const [enitenAania, setEnitenAania] = useState(0);

  const arvoSanonta = () => {
    const luku = Math.floor(Math.random() * anecdotes.length);
    setSelected(luku);
  }

  const aanesta = () => {
    let uusiPoints = [...points]; 
    uusiPoints[selected] += 1; 
    setPoints(uusiPoints); 

    if (uusiPoints[selected] > uusiPoints[enitenAania]) {
      setEnitenAania(selected);
    }
}


  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>
        {anecdotes[selected]}
      </div>
      <div>
        <p>has {points[selected]} votes</p>
      </div>
      <button onClick={aanesta}>vote</button>
      <button onClick={arvoSanonta}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[enitenAania]}</p>
    </div>
  )
}

export default App
