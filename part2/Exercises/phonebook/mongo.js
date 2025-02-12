const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

if (process.argv.length>5) {
    console.log('use "" around full name')
    process.exit(1)
}

const password = process.argv[2]
const new_name = process.argv[3]
const new_number = process.argv[4]

const url =
  `mongodb+srv://mstolt:${password}@cluster0ms.ndrc4.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0MS`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

const Phonebook = mongoose.model('Phonebook', phonebookSchema)

// creating new phonebook modul from the terminal
if (process.argv.length==5) {
    const phonebook = new Phonebook({
        name: new_name,
        number: new_number,
    })

    phonebook.save().then(result => {
        console.log('Added', new_name, 'number', new_number, 'to the phonebook')
        mongoose.connection.close()
    })
}

// fetch objects if no other parameters are named
if (process.argv.length==3) {
    console.log('phonebook:')
    Phonebook
        .find({})
        .then(result => {
            result.forEach(phonebook => {
            console.log(phonebook.name, phonebook.number)
            })
        mongoose.connection.close()
    })
}