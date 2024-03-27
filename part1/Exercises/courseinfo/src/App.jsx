const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )

}
const Content = (props) => {
  console.log(props)
  return (
    <div>
      <>
        <h2>Part {props.parts[0].number}, {props.parts[0].name}</h2>
        <p>Exercises: {props.parts[0].exercises}</p>
      </>
      <>
      <h2>Part {props.parts[1].number}, {props.parts[1].name}</h2>
      <p>Exercises: {props.parts[1].exercises}</p>
      </>
      <>
      <h2>Part {props.parts[2].number}, {props.parts[2].name}</h2>
      <p>Exercises: {props.parts[2].exercises}</p>
      </>
    </div>
  )
}

const Total = (props) => {
  const totalExercises = props.parts.reduce((total, part) => total + part.exercises, 0)
  console.log(totalExercises)

  return (
    <div>
      <p>Total number of exercises: {totalExercises}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    { number: 1, name: 'Fundamentals of React', exercises: 10 },
    { number: 2, name: 'Using props to pass data', exercises: 7 },
    { number: 3, name: 'State of a component', exercises: 14 },
    { number: 4, name: 'Dynamic test', exercises: 4},
  ]
  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App