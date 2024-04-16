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

  export default Course