import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')

  // adding a new name triggers this
  const addName = (event) => {
    event.preventDefault()
    console.log('Clicked', event.target)
    const nameWithID = {
      theName: newName,
      id: persons.length + 1,
    }

    // checking if the name already exists in the persons state
    const checkForEqualName = persons.filter((persons) => persons.theName === nameWithID.theName)
    // The filter will only "filter" a name if nameWithID.newName exists in persons

    // if a dublicate exists, the filter object will save it and this condition will be true
    if (checkForEqualName.length > 0) {
      console.log('The name "', nameWithID.theName, '" already exist')
      alert('The name ' + nameWithID.theName + ' already exist')
    } else {
      setPersons(persons.concat(nameWithID))
      console.log('Added name', nameWithID.theName)
    }
    setNewName('')
  }

  const handleAddedName = (event) => {
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