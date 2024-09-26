const morgan = require('morgan')
const express = require('express')
const app = express()
const port = 3000

app.use(express.json()) // for parsing application/json
morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = persons.find(person => person.id === id)

    if (!person) {
        res.status(404).json({
            'error': `person with id ${id} does not exist`
        })
    }

    res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = persons.find(person => person.id === id)

    if (!person) {
        res.status(404).json({
            'error': `person with id ${id} does not exist`
        })
    }

    persons = persons.filter((person) => person.id !== id)

    res.status(204).end()
})

app.post('/api/persons', (req, res) => {

    if (!req.body.name || !req.body.phone) {
        res.status(400).json({
            error: 'The name or phone is missing'
        })
    }

    if (persons.find(person => person.name === req.body.name)) {
        res.status(400).json({
            error: 'The name must be unique'
        })
    }

    const maxId = Math.max(...persons.map(person => person.id))
    const person = {
        id: String(maxId + 1),
        ...req.body
    }
    persons = persons.concat(person)
    res.json(person)
})

app.get('/info', (req, res) => {
    const date = new Date(Date.now())
    const content = `
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${date.toString()}</<p>
    `

    res.send(content)
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
