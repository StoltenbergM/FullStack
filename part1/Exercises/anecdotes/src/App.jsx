import { useState } from 'react'

const DisplayAnecdote = ({ anecdotes, selected }) => (
  <div>{anecdotes[selected]}</div>
)

const Button = ({ doFunction, text }) => (
  <button onClick={doFunction}>{text}</button>
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
  const arraylength = anecdotes.length
  const emptyarray = Array(arraylength).fill(0)

  const [selected, setSelected] = useState(0)
  const [points, storeAnecdotepoints] = useState(emptyarray)

  const getNumberBetween = (max) => {
    return Math.floor(Math.random() * max)
  }

  // generate a number and setState for setSelected, to update anecdote
  const generateNumber = () => {
    const getNumber = getNumberBetween(arraylength)
    console.log('generating anecdote number ', getNumber)
    setSelected(getNumber)
  }

  // updating the state storing the points (function in a function)
  const storePoints = (currentanecdote) => () => {
    console.log('vote for anecdote ', selected)
    const copy = [...points]
    copy[currentanecdote] += 1
    storeAnecdotepoints(copy)
  }

  return (
    <div>
      <DisplayAnecdote anecdotes={anecdotes} selected={selected}/>
      <p>has {points[selected]} votes</p>
      <Button doFunction={generateNumber} text={'Generate anecdote'}/>
      <Button doFunction={storePoints(selected)} text={'vote'}/>
    </div>
  )
}

export default App