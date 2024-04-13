import { useState } from 'react'

const Button = ({ handleButton, text }) => (
  <button onClick={handleButton}>{text}</button>
)

const StatisticLine = ({ showStat, text, procentage=false }) => {
  if (procentage) {
    return (
      <tr>
        <td>{text}:</td>
        <td>{showStat} %</td>
      </tr>
    )
  }
  return (
    <tr>
      <td>{text}:</td>
      <td>{showStat}</td>
  </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const totalPoints = good * 1 + neutral * 0 + bad * -1
  const average = totalPoints / total
  const positiveProc = good / total * 100
  
  if (total > 0) {
    return (
      <table>
        <tbody>
          <StatisticLine showStat={good} text='good' />
          <StatisticLine showStat={neutral} text='neutral' />
          <StatisticLine showStat={bad} text='bad' />
          <StatisticLine showStat={total} text='all' />
          <StatisticLine showStat={average} text='average' />
          <StatisticLine showStat={positiveProc} text='positive' procentage={true}/>
        </tbody>
      </table>
    )
  }
  return (
    <div>
      No feedback given
    </div>
  )
  
}

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