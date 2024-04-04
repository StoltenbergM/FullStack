const Hello = ({ name, age }) => {
  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
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