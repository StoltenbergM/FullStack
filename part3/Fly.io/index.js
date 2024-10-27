const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(express.static('dist')) // to make Express show static content

app.use(cors()) // enable requests from all origins (PORTS)

app.use(express.json())

// custom token for displaying the body in the console with morgan
morgan.token('body', function getName (req) {
  if (req.body.name) {
    const readableBody = JSON.stringify(req.body)
    return readableBody
  } else {
    return null
  }
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: true
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: false
  },
  {
    id: "a0f5",
    content: "POST is used to create new ressources",
    important: false
  },
  {
    id: "6857",
    content: "New note here",
    important: true
  }
]

app.get('/api/notes', (request, response) => {
  response.json(notes)
})


// make routes for different id, and 404 status code if it does not exist
app.get('/api/notes/:id', (request, response) => {
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
app.delete('/api/notes/:id', (request, response) => {
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

// post new note
app.post('/api/notes', (request, response) => {  
  const body = request.body
  const content = request.body.content

  // error code if content missing
  if (!body.content) {
    return response.status(400).json({
      error: 'information missing'
    })
  }
  // Search if name already exist
  if (notes.find(note => note.content === content)) {
    return response.status(400).json({
      error: 'content already exist'
    })
  }
  
  const note = {
    id: generaterandomID(),    
    content: body.content,
    important: true,
  }

  notes = notes.concat(note)

  response.json(note)
})

// Middleware if no route is called (notice the middleware function is after the route)
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})