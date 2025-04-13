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
  response.send(`<p>Notes has info for ${show_count_notes} people</p><p>${show_time_stamp}<p>`)
})

// making a delete route
app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

// post new note
app.post('/api/notes', (request, response, next) => {  
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })
  .catch(error => next(error))
})

// if a note is edited
app.put('/api/notes/:id', (request, response, next) => {
  const { content, important } = request.body

  Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true, runValidators: true, context: 'query' }
  )
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
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
// this has to be the last loaded middleware, also all the routes should be registered before this!

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`)
})