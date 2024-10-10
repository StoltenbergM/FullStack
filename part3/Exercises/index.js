const express = require('express')
const app = express()

app.use(express.json())

let notes = [
    {
      id: "1",
      name: "Arto Hellas", 
      number: "040-123456"
    },
    { 
      id: "2",
      name: "Ada Lovelace", 
      number: "39-44-5323523"
    },
    { 
      id: "3",
      name: "Dan Abramov", 
      number: "12-43-234345"
    },
    { 
      id: "4",
      name: "Mary Poppendieck", 
      number: "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
  response.json(notes)
})

// make routes for different id, and 404 status code if it does not exist
app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const note = notes.find(note => note.id === id)
  
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})


// Function that returns the CURRENT time (in miliseconds since 1970)
const time = () => {
  return Date.now()
}

// Function that counts the number of notes
const count_notes = () => {
  return notes.length
}

app.get('/info', (request, response) => {
  const show_time_stamp = Date(time())
  const count_persons = count_notes()
  console.log("show_time", show_time_stamp)
  response.send(`<p>Phonebook has info for ${count_persons} people</p><p>${show_time_stamp}<p>`)
})

const PORT = 3001
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})