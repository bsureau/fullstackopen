const mongoose = require('mongoose')

mongoose.set('strict', false)

const url = process.env.MONGODB_URI

mongoose.connect(url)
    .then(result => console.log('Connected to database!'))
    .catch(error => console.log('Error connecting to database: ', error))

const personSchema = mongoose.Schema({
    name: String,
    phone: String
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)
