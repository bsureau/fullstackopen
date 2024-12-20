const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blog')
const usersRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
require('dotenv').config()

app.use(cors())
app.use(express.json())


const MONGODB_PASSWORD = process.env.NODE_ENV === 'prod'
    ? process.env.MONGODB_PASSWORD
    : process.env.MONGODB_TEST_PASSWORD

const mongoUrl = process.env.NODE_ENV === 'prod'
    ? `mongodb+srv://fullstack:${MONGODB_PASSWORD}@cluster0.nmq3e.mongodb.net/bloglistapp?retryWrites=true&w=majority`
    : `mongodb+srv://fullstack:${MONGODB_PASSWORD}@cluster0.nmq3e.mongodb.net/bloglistapp_test?retryWrites=true&w=majority`

mongoose
    .connect(mongoUrl)
    .then(() => console.log('connected to database!'))
    .catch(error => console.log('error while connecting to database: ', error))


app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/test')
    app.use('/api/test', testingRouter)
}

module.exports = app
