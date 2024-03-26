const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}
const Content = (props) => {
  return (
    <div>
      <h2>Part {props.number}, {props.name}</h2>
      <p>Exercises: {props.exercises}</p>
    </div>
  )
}

const Total = () => {
  return (
    <div>
      {course}
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    { number: 1, name: 'Fundamentals of React', exercises: 10 },
    { number: 2, name: 'Using props to pass data', exercises: 7 },
    { number: 3, name: 'State of a component', exercises: 14 },
  ]
  return (
    <div>
      <Header course={course} />
      {parts.map(part => (
        <Content key={part.number} number={part.number} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  )
}

export default App