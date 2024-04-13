import { useState } from 'react'

const Button = ({ handleButton, text }) => (
  <button onClick={handleButton}>{text}</button>
)

const Statistics = ({ good, neutral, bad }) => (
  <div>
    <p>good: {good}</p>
    <p>neutral: {neutral}</p>
    <p>bad: {bad}</p>
  </div>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addState = ({ state, setState }) => () => {
    setState(state + 1)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleButton={addState({ state: good, setState: setGood })} text='good' />
      <Button handleButton={addState({ state: neutral, setState: setNeutral })} text='neutral' />
      <Button handleButton={addState({ state: bad, setState: setBad })} text='bad' />

      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
