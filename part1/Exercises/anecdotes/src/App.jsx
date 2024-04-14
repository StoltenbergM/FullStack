import { useState } from 'react'

const DisplayAnecdote = ({ anecdotes, selected }) => (
  <div>
    {anecdotes[selected]}
  </div>
)

const Button = ({ generateAnecdote, text }) => (
  <button onClick={generateAnecdote}>{text}</button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Extra easter egg: Creativity is key',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)

  const getNumberBetween = (max) => {
    return Math.floor(Math.random() * max)
  }

  const generateNumber = () => {
    const max = anecdotes.length
    const getNumber = getNumberBetween(max)
    console.log('generating anecdote number ', getNumber)
    return setSelected(getNumber)
  }

  return (
    <div>
      <DisplayAnecdote anecdotes={anecdotes} selected={selected}/>
      <Button generateAnecdote={generateNumber} text={'Generate anecdote'}/>
    </div>
  )
}

export default App