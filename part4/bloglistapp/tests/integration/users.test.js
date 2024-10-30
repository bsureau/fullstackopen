const supertest = require('supertest')
const app = require('../../app')
const mongoose = require('mongoose')
const User = require('../../models/user')
const api = supertest(app)

describe('users', () => {

    const initializeDatabase = async () => {
        await User.deleteMany({})
    }

    beforeEach(async () => {
        await initializeDatabase()
    })

    test('it creates a user', async () => {
        const newUser = {
            username: 'jeannemard',
            name: 'jean némard',
            password: '3jreI!I43je9430h*',
        }

        const response = await api
            .post('/api/users')
            .send(newUser)

        expect(response.status).toBe(201)

        const users = await User.find({})
        expect(users.length).toBe(1)
    })

    test('it gets users', async () => {
        const existingUser = {
            username: 'jeannemard',
            name: 'jean némard',
            password: '3jreI!I43je9430h*',
        }

        await api
            .post('/api/users')
            .send(existingUser)

        const response = await api
            .get('/api/users')

        expect(response.status).toBe(200)
        expect(response._body.length).toBe(1)
        expect(response._body[0].username).toBe(existingUser.username)
    })


    const users = [
        [
            'it returns 400 bad request if username is less than 3 characters length.',
            {
                username: "eh",
                name: "Jean",
                password: '12345'
            },
            400
        ],
        [
            'it returns 400 bad request if password is less than 3 characters length.',
            {
                username: "jeannemard",
                name: "Jean",
                password: '12'
            },
            400
        ],
        [
            'it returns 400 bad request if username is not set.',
            {
                username: "jeannemard",
                name: "Jean",
            },
            400
        ],
        [
            'it returns 400 bad request if password is not set.',
            {
                username: "jeannemard",
                name: "Jean",
            },
            400
        ]
    ]

    test.each(users)('%s', async (test, invalidUserd, httpResponseStatus) => {
        await api
            .post('/api/users')
            .send(invalidUserd)
            .expect(httpResponseStatus)
    })

    test('it returns 400 bad request if username is already taken', async () => {
        const existingUser = new User({
            username: 'JeanNémard',
            password: '1234',
            passwordHash: 'hashed1234'
        })

        await existingUser.save()

        const newUser = {
            username: 'JeanNémard',
            password: '4321',
            passwordHash: 'hashed4321'
        }

        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    })

    afterAll(async () => {
        await mongoose.connection.close()
    })
})

