import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')

  // What to do when the input changes
  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  // adding a note here, called by the button
  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }

    axios
    .post('http://localhost:3001/notes', noteObject)
    .then(response => {
      console.log(response)
        setNotes(notes.concat(response.data)) // adds the newNote event to the notes by setNotes
        setNewNote('') // clears the input
    })
  }

  // fetching data from the server using useEffect and axios
  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }, [])
  console.log('render', notes.length, 'notes')

  const toggleImportanceOf = (id) => {
    console.log('importance of ' + id + ' needs to be toggled')
    notes.map(note =>
      note.id == id
    )
  }

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => 
          <Note 
            key={note.id} 
            note={note} 
            toggleImportance={() => toggleImportanceOf(note.id)} 
          />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input 
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App