require('dotenv').config()
const morgan = require('morgan')
const express = require('express')
const app = express()
const Person = require('./models/person')

app.use(express.json()) // for parsing application/json
morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.static('dist'))

app.get('/api/persons', (req, res, next) => {
    Person
        .find({})
        .then(persons => res.json(persons))
        .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
    Person
        .findById(req.params.id)
        .then(person => {
            if (person)
                return res.json(person)
            else
                return res.status(404).end()
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person
        .findByIdAndDelete(req.params.id)
        .then(result => res.status(204).end())
        .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body

    const person = {
        ...body
    }

    Person
        .findByIdAndUpdate(req.params.id, person, { new: true })
        .then(updatedPerson => res.json(updatedPerson))
        .catch(error => next(error))

})

app.post('/api/persons', async (req, res, next) => {
    if (!req.body.name || !req.body.phone) {
        res.status(400).json({
            error: 'The name or phone is missing'
        })
    }

    const person = new Person({
        ...req.body
    })

    const personAlreadyExist = await Person.findById(person.id)

    if (personAlreadyExist)
        res.status(409).json(personAlreadyExist)

    person
        .save()
        .then(person => res.json(person))
        .catch(error => next(error))
})

app.get('/info', async (req, res) => {
    const date = new Date(Date.now())

    const persons = await Person.find({})

    const content = `
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${date.toString()}</<p>
    `

    res.send(content)
})

const unknownEndpoint = (req, res, next) => {
    res.status(404).send({
        error: 'unknown endpoint'
    })
}
app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
    console.log('error message : ', error.message)
    next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})
