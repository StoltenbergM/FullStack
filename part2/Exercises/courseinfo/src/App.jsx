const Header = (props) => {
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  )
}

const Part = ({ name, exercises }) => {
  return (
    <li>{name} {exercises}</li>
  )
}

const Content = ({ course }) => {
  const parts = course.parts
  console.log(parts)
  return (
    <div>
      <ul>
        {parts.map(part => 
          <Part key={part.number} name={part.name} exercises={part.exercises} />
        )}
      </ul>
    </div>
  )
}

const Course = ({ course }) => (
  <div>
    <Header course={course} />
    <Content course={course} />
  </div>
)


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
      <Course course={course} />
    </div>
  )
}

export default App