const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(morgan('tiny'))

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

// making a delete route
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

const generaterandomID = () => {
  // generate random number from notes.length to 10000
  const minnumberID = notes.length > 0
    ? notes.length
    : 0
  const random_number = Math.floor(Math.random() * 10000 + minnumberID)
  return random_number
}

// post new person
app.post('/api/persons', (request, response) => {  
  const body = request.body
  const new_name = request.body.name

  // error code if name or number missing
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'information missing'
    })
  }
  // Search if name already exist
  if (notes.find(note => note.name === new_name)) {
    return response.status(400).json({
      error: 'name already exist'
    })
  }
  
  const note = {
    id: generaterandomID(),    
    name: body.name,
    number: body.number,
  }

  notes = notes.concat(note)

  response.json(note)
})

// Middleware if no route is called (notice the middleware function is after the route)
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


const PORT = 3001
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})