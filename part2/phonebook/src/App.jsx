import { useState, useEffect } from 'react'
import axios from 'axios'
import noteService from './services/notes'
import Notification from './components/Notification'

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

const DeletePerson = ({ deleteName, person }) => (
  <>
    <button onClick={() => deleteName(person)}>delete</button>
  </>
)

const ShowPerson = ({ person, deleteName }) => (
  <li>
    {person.name} {person.number} <DeletePerson deleteName={deleteName} person={person} />
  </li>
)

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newFilter, setNewFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(false)

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
    const newNameandNumber = {
      name: newName,
      number: newNumber
    }

    // checking if the name already exists in the persons state
    const checkForEqualName = persons.filter((persons) => persons.name === newNameandNumber.name)
    // The filter will only "filter" a name if newNameandNumber.newName exists in persons

    // if a dublicate exists, the filter object will save it and this condition will be true
    if (checkForEqualName.length > 0) {
      const existingPerson = checkForEqualName[0]
      const existingName = existingPerson.name
      const existingID = existingPerson.id

      if (window.confirm(`The name ${existingName} is already added to the phonebook. Do you want to replace the old number with the new one?`)) {
        console.log("the new name", existingName)
        noteService
          .updateNumber(existingID, newNameandNumber)
          .then(returnedData => {
            console.log(returnedData)
            setPersons(persons.map(n => n.id !== existingID ? n : returnedData))
            console.log('updating the number for ', existingID)
          })
          .catch(error => {
            // setting a styled error for 3 sec
            setNotificationMessage(
              `the person was already deleted from server`
            )
            setErrorMessage(true) // toggle the error message to make the text red
            setTimeout(() => {
              setNotificationMessage(null)
              setErrorMessage(false)
            }, 3000)
            setPersons(persons.filter(n => n.id !== existingID)) //The error message is displayed to the user with alert dialog popup, and the deleted note gets filtered out from the state.
          })
      }
    } else {
      noteService
        .create(newNameandNumber)
        .then(returnedNote => {
          setPersons(persons.concat(returnedNote))
          // setting a styled notification for 3 sec
          setNotificationMessage(
            `Added '${newNameandNumber.name}'`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 3000)
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

  const deleteName = ( person ) => {
    const id = person.id
    const deletingName = ( id ) => {
      noteService
        .deleteName(id)
        .then(() => {
          setPersons(persons.filter(n => n.id !== id))
          console.log('deleted', id)
        })
        .catch(error => {
          alert(
            `the person was already deleted from server`
          )
          setPersons(persons.filter(n => n.id !== id)) //The error message is displayed to the user with alert dialog popup, and the deleted note gets filtered out from the state.
        })
    } 

    if (window.confirm(`Delete ${person.name}?`)) {
      deletingName(id)
      console.log(person)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} errorNotification={errorMessage}/>
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
        <ShowPerson key={person.id} person={person} deleteName={deleteName}/>
      )}
    </div>
  )
}

export default App