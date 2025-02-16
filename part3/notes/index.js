// make sure we can read the url (and password) from .env:
require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const { ReturnDocument } = require('mongodb')
// getting our mongoDB code in models/note.js
const Note = require('./models/note')

const app = express()

// Middleware

app.use(express.static('dist')) // to make Express show static content
app.use(cors()) // enable requests from all origins (PORTS)
app.use(express.json())

// requestLogger - custom token for displaying the body in the console with morgan
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
  }
]

// fetching all notes
app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})


// make routes for different id with Mongoose's findById
app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id).then(note => {
    response.json(note)
  })
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
  const show_count_notes = count_notes()
  console.log("show_time", show_time_stamp)
  response.send(`<p>Phonebook has info for ${show_count_notes} people</p><p>${show_time_stamp}<p>`)
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
  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }
  
  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })
})

// put ?
app.put('/api/notes/:id', (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

// Middleware if no route is called (notice the middleware function is after the route)
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

// error handler middleware
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}
// this has to be the last loaded middleware, also all the routes should be registered before this!

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})