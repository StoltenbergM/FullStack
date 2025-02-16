// make sure we can read the url (and password) from .env:
require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const { ReturnDocument } = require('mongodb')
// getting our mongoDB code in models/contact.js
const Contact = require('./models/contact')

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

// fetching all contacts
app.get('/api/contacts', (request, response) => {
    Contact.find({}).then(contacts => {
    response.json(contacts)
  })
})


// make routes for different id with Mongoose's findById
app.get('/api/contacts/:id', (request, response) => {
    Contact.findById(request.params.id).then(contacts => {
    response.json(contacts)
  })
})

// Function that returns the CURRENT time (in miliseconds since 1970)
const time = () => {
  return Date.now()
}

// Function that counts the number of contacts
const count_contacts = () => {
  return contacts.length
}

app.get('/info', (request, response) => {
  const show_time_stamp = Date(time())
  const show_count_contacts = count_contacts()
  console.log("show_time", show_time_stamp)
  response.send(`<p>Phonebook has info for ${show_count_contacts} people</p><p>${show_time_stamp}<p>`)
})

// making a delete route
app.delete('/api/contacts/:id', (request, response) => {
  const id = request.params.id
  contacts = contacts.filter(contacts => contacts.id !== id)

  response.status(204).end()
})

const generaterandomID = () => {
  // generate random number from contacts.length to 10000
  const minnumberID = contacts.length > 0
    ? contacts.length
    : 0
  const random_number = Math.floor(Math.random() * 10000 + minnumberID)
  return random_number
}

// post new contacts
app.post('/api/contacts', (request, response) => {
  const body = request.body

  // error code if content missing
  if (body.name === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }
  
  const contact = new Contact({
    name: body.name,
    number: body.number,
  })

  contact.save().then(savedContact => {
    response.json(savedContact)
  })
})

// Middleware if no route is called (notice the middleware function is after the route)
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})