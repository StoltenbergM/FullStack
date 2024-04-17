import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')

  // 
  const addName = (event) => {
    event.preventDefault()
    console.log('Clicked', event.target)
    const nameWithID = {
      theName: newName,
      id: persons.length + 1,
    }
    setPersons(persons.concat(nameWithID))
    console.log('Add name', nameWithID)
    setNewName('')
  }

  const handleAddedName = (event) => {
    console.log('Handle name:', event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: 
          <input 
            value={newName}
            onChange={handleAddedName}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => 
        <li key={person.id}>{person.theName}</li>
      )}
    </div>
  )
}

export default App