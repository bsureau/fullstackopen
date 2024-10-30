const supertest = require('supertest')
const User = require('../../models/user')
const bcrypt = require('bcrypt')
const app = require('../../app')
const api = supertest(app)
const mongoose = require('mongoose')

describe('login', () => {


    const initializeDatabase = async () => {
        await User.deleteMany({})
    }

    beforeEach(async () => {
        await initializeDatabase()
    })

    test('it login successfully', async () => {
        const password = '1234'
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const user = new User({
            username: 'jeannemard',
            name: 'Jean Némard',
            passwordHash: passwordHash
        })

        await user.save();

        const response = await api
            .post('/api/login')
            .send({
                username: 'jeannemard',
                password: '1234'
            })

        expect(response.status).toBe(200)
    })
    const errors = [
        [
            'it returns 401 forbbiden when user has wrong password',
            {
                username: 'jeannemard',
                password: '124'
            },
            401
        ],
        [
            'it returns 401 forbbiden when username does not exist',
            {
                username: 'jeannemarde',
                password: '1234'
            },
            401
        ],
    ]

    test.each(errors)('%s', async (test, credentials, responseHttpStatus) => {
        const password = '1234'
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const user = new User({
            username: 'jeannemard',
            name: 'Jean Némard',
            passwordHash: passwordHash
        })

        await user.save();

        const response = await api
            .post('/api/login')
            .send({
                username: credentials.username,
                password: credentials.password
            })

        expect(response.status).toBe(401)
    })


    afterEach(async () => {
        await User.deleteMany({})
    })

    afterAll(async () => {
        await mongoose.connection.close()
    })

})
