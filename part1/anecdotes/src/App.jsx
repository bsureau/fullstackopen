import { useState } from 'react'

const Title = ({ title }) => <h1>{title}</h1>
const Button = ({ eventHandler, text }) => <button onClick={eventHandler}>{text}</button>

const App = () => {
  const inMemoryAnecdotes = [
    { anectode: 'If it hurts, do it more often.', vote: 0 },
    { anectode: 'Adding manpower to a late software project makes it later!', vote: 0 },
    { anectode: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', vote: 0 },
    { anectode: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', vote: 0 },
    { anectode: 'Premature optimization is the root of all evil.', vote: 0 },
    { anectode: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', vote: 0 },
    { anectode: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.', vote: 0 },
    { anectode: 'The only way to go fast, is to go well.', vote: 0 }
  ]

  const [selected, setSelected] = useState(0)
  const [anecdotes, setAnecdotes] = useState(inMemoryAnecdotes)
  const [topAnecdote, setTopAnecdote] = useState(null)

  const handleNextAnecdoteClick = () => setSelected(Math.floor(Math.random() * anecdotes.length))
  const handleVoteClick = () => {
    const anecdotesCopy = [...anecdotes]
    anecdotesCopy[selected].vote += 1
    setAnecdotes(anecdotesCopy)
    if (topAnecdote === null || topAnecdote.vote < anecdotesCopy[selected].vote) {
      setTopAnecdote(anecdotesCopy[selected])
    }
  }

  return (
    <div>
      <Title title='Anecdote of the day' />
      <p>{anecdotes[selected].anectode}</p>
      <p> has {anecdotes[selected].vote} vote{anecdotes[selected].vote > 0 && 's'}</p>
      <Button eventHandler={handleVoteClick} text='Vote' />
      <Button eventHandler={handleNextAnecdoteClick} text='Next anecdote' />
      <Title title='Anecdote with most votes' />
      {topAnecdote !== null &&
        (<>
          <p>{topAnecdote.anectode}</p>
          <p>has {topAnecdote.vote} vote{topAnecdote.vote > 0 && 's'}</p>
        </>
        )
      }
    </div>
  )
}

export default App
