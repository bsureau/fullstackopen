const router = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/', async (request, response) => {

    const { username, password } = request.body

    const user = await User.findOne({ username })

    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)

    if (!passwordCorrect) {
        return response
            .status(401)
            .json({
                error: 'invalid username or password'
            })
    }

    const userForToken = {
        username: username,
        id: user._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: '1h' })

    response
        .status(200)
        .json({
            token: token,
            username: user.username
        })
})

module.exports = router
