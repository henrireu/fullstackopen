const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let anecdotes = [
  {
    "content": "If it hurts, do it more often",
    "id": "47145",
    "votes": 0
  },
  {
    "content": "Adding manpower to a late software project makes it later!",
    "id": "21149",
    "votes": 0
  },
  {
    "content": "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "id": "69581",
    "votes": 0
  },
  {
    "content": "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "id": "36975",
    "votes": 0
  },
  {
    "content": "Premature optimization is the root of all evil.",
    "id": "25170",
    "votes": 0
  },
  {
    "content": "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "id": "98312",
    "votes": 0
  }
];

app.get('/anecdotes', (req, res) => {
  res.json(anecdotes);
});

app.get('/anecdotes/:id', (req, res) => {
  const id = req.params.id;
  const anecdote = anecdotes.find(a => a.id === id);
  if (anecdote) {
    res.json(anecdote);
  } else {
    res.status(404).send({ error: 'Anecdote not found' });
  }
});

app.post('/anecdotes', (req, res) => {
  const anecdote = req.body;
  console.log(anecdote)
  if (!anecdote.id || anecdote.votes === undefined) {
    return res.status(400).send({ error: 'Anecdote must have an id and votes' });
  }
  anecdotes.push(anecdote);
  res.status(201).json(anecdote);
});

app.put('/anecdotes/:id/vote', (req, res) => {
  const id = req.params.id;
  const anecdote = anecdotes.find(a => a.id === id);
  if (anecdote) {
    anecdote.votes += 1;
    res.json(anecdote);
  } else {
    res.status(404).send({ error: 'Anecdote not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});