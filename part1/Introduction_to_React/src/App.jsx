const Hello = (props) => {
  console.log(props)
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old </p>
    </div>
  )
}

const App = () => {
  const name = "Bobby"
  const age = "40"
  return (
    <>
      <h1>Greetings</h1>
      <Hello name={name} age={age} />
      <Hello name="Mamma" age={20+12} />
    </>
  )
}
export default App