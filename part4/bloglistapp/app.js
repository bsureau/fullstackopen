const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blog')
require('dotenv').config()

app.use(cors())
app.use(express.json())

const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD
const mongoUrl = `mongodb+srv://fullstack:${MONGODB_PASSWORD}@cluster0.nmq3e.mongodb.net/bloglistapp?retryWrites=true&w=majority`
mongoose
    .connect(mongoUrl)
    .then(() => console.log('connected to database!'))
    .catch(error => console.log('error while connecting to database: ', error))


app.use('/api/blogs', blogRouter)

module.exports = app
