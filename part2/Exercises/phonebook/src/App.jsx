import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newFilter, setNewFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  // filtering by names
  const addFilter = (event) => {
    console.log(event.target)
    console.log('filter:', newFilter)
    event.preventDefault()
    setNewFilter('')
  }

  // adding a new name triggers this
  const addName = (event) => {
    event.preventDefault()
    console.log('Clicked', event.target)
    const nameWithID = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }

    // checking if the name already exists in the persons state
    const checkForEqualName = persons.filter((persons) => persons.name === nameWithID.name)
    // The filter will only "filter" a name if nameWithID.newName exists in persons

    // if a dublicate exists, the filter object will save it and this condition will be true
    if (checkForEqualName.length > 0) {
      console.log('The name "', nameWithID.name, '" already exist')
      alert('The name ' + nameWithID.name + ' already exist')
    } else {
      setPersons(persons.concat(nameWithID))
      console.log('Added name', nameWithID.name)
    }
    setNewName('')
    setNewNumber('')
  }

  const handleFilter = (event) => {
    setNewFilter(event.target.value)
  }
  const handleAddedName = (event) => {
    setNewName(event.target.value)
  }
  const handleAddedNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const filteredPersons = persons.filter((person => 
    person.name.toLowerCase().includes(newFilter.toLowerCase())))

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addFilter}>
        <div>
          filter: 
          <input
            value={newFilter}
            onChange={handleFilter}
          />
        </div>
      </form>
      <h2>Add new</h2>
      <form onSubmit={addName}>
        <div>
          name: 
          <input 
            value={newName}
            onChange={handleAddedName}
          />
        </div>
        <div>
          number: 
          <input 
            value={newNumber}
            onChange={handleAddedNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPersons.map(person => 
        <li key={person.id}>{person.name} {person.number}</li>
      )}
    </div>
  )
}

export default App