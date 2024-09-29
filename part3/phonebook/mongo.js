const mongoose = require('mongoose')
mongoose.set('strict', false)


const personSchema = mongoose.Schema({
    name: String,
    phone: String
})

const Person = mongoose.model('Person', personSchema)

const connectToDatabase = (password) => {
    const url = `mongodb+srv://fullstack:${password}@cluster0.nmq3e.mongodb.net/phonebook?retryWrites=true&w=majority`
    mongoose.connect(url)
}

if (process.argv.length === 3) {
    const password = process.argv[2]
    connectToDatabase(password)
    Person
        .find({})
        .then(people => {
            console.log('Phonebook:')
            people.forEach(person => {
                console.log(`${person.name} ${person.phone}`)
            });
            mongoose.connection.close()
        })
} else {
    if (process.argv.length < 5) {
        console.log("wrong number of arguments")
        process.exit(1)
    }

    const password = process.argv[2]
    const name = process.argv[3]
    const phone = process.argv[4]

    connectToDatabase(password)

    const person = new Person({
        name: name,
        phone: phone
    })

    person
        .save()
        .then(result => {
            console.log(`added ${name} number ${phone} to phonebook`)
            mongoose.connection.close()
        })
}

