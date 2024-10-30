const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

router.post('/', async (request, response) => {
    try {
        const { username, name, password } = request.body

        if (password.length < 3) {
            throw new Error('Password must be more than 3 characters length.', {
                password: password
            })
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const user = new User({ username, name, passwordHash })

        const savedUser = await user.save()

        response.status(201).json(savedUser)
    } catch (error) {
        response.status(400).json({
            error: error.message
        })
    }
})

router.get('/', async (request, response) => {
    try {
        const users = await User.find({}).populate('blogs', {
            url: 1,
            title: 1,
            author: 1,
            id: 1
        })
        response.json(users)
    } catch (error) {
        response.status(400).json({
            error: error.message
        })
    }
})

module.exports = router
