const Header = (props) => {
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  )

}
const Content = (props) => {
  console.log(props)
  return (
    <div>
        <h2>Part {props.course.parts[0].number}: {props.course.parts[0].name}</h2>
        <p>Exercises: {props.course.parts[0].exercises}</p>
        <h2>Part {props.course.parts[1].number}: {props.course.parts[1].name}</h2>
        <p>Exercises: {props.course.parts[1].exercises}</p>
        <h2>Part {props.course.parts[2].number}: {props.course.parts[2].name}</h2>
        <p>Exercises: {props.course.parts[2].exercises}</p>
    </div>
  )
}

const Total = (props) => {
  console.log(props)

  return (
    <div>
      <h2>Total</h2>
      <p>Total number of exercises: {props.course.parts[0].exercises + props.course.parts[1].exercises +props.course.parts[2].exercises }</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      { number: 1, name: 'Fundamentals of React', exercises: 10 },
      { number: 2, name: 'Using props to pass data', exercises: 7 },
      { number: 3, name: 'State of a component', exercises: 14 },
    ]
  }
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default App