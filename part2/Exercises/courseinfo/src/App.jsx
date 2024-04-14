const Header = ({ course }) => {
  return (
    <div>
      <h1>{course.name}</h1>
    </div>
  )
}

const Part = ({ name, exercises }) => {
  return (
    <li>{name} {exercises}</li>
  )
}

const Content = ({ parts }) => {
  console.log(parts)
  return (
    <div>
      <ul>
        {parts.map(part => 
          <Part name={part.name} exercises={part.exercises} key={part.id} />
        )}
      </ul>
    </div>
  )
}



const Total = ({ parts }) => {
  // using "reduce" to calculate the sum of exercises:
  const sumExercises = parts.reduce((total, exercises) =>
    total + exercises.exercises, 0)

  return (
    <div>
      <b>
        Total of {sumExercises} exercises
      </b>
    </div>
  )
}

const Course = ({ course }) => (
  <div>
    <Header course={course} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
)


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }
  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App