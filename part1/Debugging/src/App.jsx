import { useState } from 'react'

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Display = ({ showvalue }) => (<div>{showvalue}</div>)

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [value, setValue] = useState(0)

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  const resetState = () => {
    console.log('Resetting the values..')
    setLeft(0)
    setRight(0)
    setAll([])
  }

  const customHello = (who) => () => {
    console.log('hello', who)
  }

  // a function in a function to achieve certain functionality
  const setToValue = (newvalue) => () => {
    setValue(newvalue)
  }

  // Another way of achieving it
  const setAnotherValue = (anothervalue) => {
    setValue(anothervalue)
  }

  return (
    <div>
      {left}
      <Button handleClick={handleLeftClick} text='left' />
      <Button handleClick={handleRightClick} text='right' />
      {right}
      <History allClicks={allClicks} />
      <br></br>
      <div>
        Reset:   
        <Button handleClick={resetState} text={'X'} />
      </div>
      <br></br>
      <div>
        <button onClick={customHello('world')}>Hello World</button>
      </div>
      <br></br>
      <div>
        <Display showvalue={value} />
        <button onClick={setToValue(100)}>Set to 100</button>
        <button onClick={setToValue(0)}>Set to 0</button>
        <Button handleClick={setToValue(value+1)} text='+1' />

        <Button handleClick={() => setAnotherValue(value + 10)} text='+10' />
      </div>
    </div>
  )
}

export default App
