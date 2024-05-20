import { useState, useEffect } from 'react'
import axios from 'axios'
import noteService from './services/notes'

const Filter = ({ addFilter, newFilter, handleFilter }) => (
  <form onSubmit={addFilter}>
    <div>
      filter: 
      <input
        value={newFilter}
        onChange={handleFilter}
      />
    </div>
  </form>
)

const AddPerson = ({ addName, newName, handleAddedName, newNumber, handleAddedNumber }) => (
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
)

const ShowPerson = ({ person }) => (
  <li>{person.name} {person.number}</li>
)

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newFilter, setNewFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  // fetching server data by the hook useEffect (from db.json)
  useEffect(() => {
    noteService
      .getAll()
      .then(initialData => {
        setPersons(initialData)
      })
  }, [])
  console.log('render', persons.length, 'persons')

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
      noteService
        .create(nameWithID)
        .then(returnedNote => {
          setPersons(persons.concat(returnedNote))
        })
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
      <Filter addFilter={addFilter} newFilter={newFilter} handleFilter={handleFilter}/>
      <h2>Add new</h2>
      <AddPerson 
        addName={addName} 
        newName={newName} 
        handleAddedName={handleAddedName} 
        newNumber={newNumber} 
        handleAddedNumber={handleAddedNumber} 
      />
      <h2>Numbers</h2>
      {filteredPersons.map(person => 
        <ShowPerson key={person.id} person={person} />
      )}
    </div>
  )
}

export default App