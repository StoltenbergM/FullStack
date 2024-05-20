import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'
import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')

  // What to do when the input changes
  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  // fetching data from the server using useEffect and axios
  useEffect(() => {
    noteService // using axios from /services/notes.js
      .getAll()
      .then(initialData => {
        setNotes(initialData)
      })
  }, [])

  // toggling the important part based on the id of the note
  const toggleImportanceOf = (id) => {
    // find method to find the node we want
    const note = notes.find(n => n.id === id)
    // new note object with the important flipped (using object spread)
    const changedNote = { ...note, important: !note.important }
    
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(n => n.id !== id ? n : returnedNote))
      })
      .catch(error => {
        alert(
          `the note '${note.content}' was already deleted from server`
        )
        setNotes(notes.filter(n => n.id !== id)) //The error message is displayed to the user with alert dialog popup, and the deleted note gets filtered out from the state.
      })
  }

  // adding a note here, called by the button
  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }
    
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote)) // adds the newNote event to the notes by setNotes
        setNewNote('') // clears the input
      })
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