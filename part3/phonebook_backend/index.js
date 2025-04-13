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
app.get('/api/contacts/:id', (request, response, next) => {
  const id = request.params.id 
  console.log("Searching for ID:", id); // Log the ID

  Contact.findById(request.params.id)
  .then(contact => {
    if (contact) {
      response.json(contact)
      // if there is no id found:
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      console.log("catch: ", error)
      next(error)
    })
  })

// Function that returns the CURRENT time (in miliseconds since 1970)
const time = () => {
  return Date.now()
}

// counts the number of contacts
app.get('/info', (request, response) => {
  const show_time_stamp = Date(time())  
  Contact.countDocuments({})
    .then(result => {
      response.send(`<p>Phonebook has info for ${result} people</p><p>${show_time_stamp}<p>`)
    })
    .catch(error => next(error))
})

// making a delete route
app.delete('/api/contacts/:id', (request, response, next) => {
  Contact.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

// change contact number
app.put('/api/contacts/:id', (request, response, next) => {
  const body = request.body

  const contact = {
    name: body.name,
    number: body.number,
  }

  console.log("new contact:", contact)
  Contact.findByIdAndUpdate(request.params.id, contact, { new: true, runValidators: true })
    .then(updatedContact => {
      if (!updatedContact) {
        console.log("Contact not found");
        return response.status(404).json({ error: "Contact not found" });
      }
      response.json(updatedContact)
    })
    .catch(error => next(error))
})

// post new contacts
app.post('/api/contacts', (request, response) => {
  const body = request.body

  // error code if content missing
  if (body.name === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  // error code if name is too short
  console.log(body.name)
  if (body.name.length < 4) {
    return response.status(400).json({ error: 'name too short' })
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