const mongoose = require('mongoose')

// DO NOT SAVE YOUR PASSWORD TO GITHUB!! - get pw from .env
const url = process.env.MONGODB_URI
console.log('Connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connecting to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to mongoDB: ', error.message)
  })

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

// transform the Schema method, to avoid returned __v and _id
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Note', noteSchema)