const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Part = ({ name, exercises }) => {
  return (
    <li>{name} {exercises}</li>
  )
}

const Content = ({ parts }) => {
  return (
    <ul>
      {parts.map(part => 
        <Part name={part.name} exercises={part.exercises} key={part.id} />
      )}
    </ul>
  )
}

const Total = ({ parts }) => {
  // using "reduce" to calculate the sum of exercises:
  const sumExercises = parts.reduce((total, exercises) =>
    total + exercises.exercises, 0)

  return (
    <b>
      Total of {sumExercises} exercises
    </b>
  )
}

// each course component is made here
const Course = ({ course }) => (
  <>
    <Header course={course} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </>
)


const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }, 
    {
      name: 'Test',
      id: 3,
      parts: [
        {
          name: 'Really easy',
          exercises: 5,
          id: 1
        },
        {
          name: 'Really hard',
          exercises: 5,
          id: 2
        }
      ]
    }
  ]

  return (
    <>
      {courses.map(course => 
        <Course key={course.id} course={course} />
      )}
    </>
  )
}

export default App