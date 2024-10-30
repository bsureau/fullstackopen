const supertest = require('supertest')
const app = require('../../app')
const Blog = require('../../models/blog')
const User = require('../../models/user')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const api = supertest(app)


describe('Blogs', () => {

    const initialBlogs = [
        {
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            __v: 0
        },
        {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5,
            __v: 0
        },
        {
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
        },
        {
            _id: "5a422b891b54a676234d17fa",
            title: "First class tests",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
            likes: 10,
            __v: 0
        },
        {
            _id: "5a422ba71b54a676234d17fb",
            title: "TDD harms architecture",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
            likes: 0,
            __v: 0
        },
        {
            _id: "5a422bc61b54a676234d17fc",
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2,
            __v: 0
        }
    ]

    const user = new User({
        username: 'JeanNémard',
        password: '1234',
        passwordHash: 'hashed1234'
    })

    let token = null

    beforeAll(async () => {
        await User.deleteMany({})
        await user.save()
        const userForToken = {
            username: user.username,
            id: user._id
        }
        token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: '1h' })
    })

    const initializeDatabase = async () => {
        await Blog.deleteMany({})
        const promiseArray = initialBlogs.map(async blog => {
            const blogObject = new Blog(blog)
            await blogObject.save()
        });
        await Promise.all(promiseArray)
    }

    beforeEach(async () => {
        await initializeDatabase()
    })


    test('it returns the correct amount of blog posts in JSON format', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body.length).toBe(6)
    })

    test('it returns blog posts with identifier property named id', async () => {
        const response = await api
            .get('/api/blogs')

        response.body.forEach(blog => expect(blog).toHaveProperty("id"))
    })

    test('it creates a new blog', async () => {
        const newBlog = {
            title: "Mon blog",
            author: "Jean Némard",
            url: "http://blog.jeannemard.fr",
            likes: 20,
        }

        const response = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)

        const blogs = await Blog.find({})

        expect(blogs.length).toBe(initialBlogs.length + 1)
    })

    test('it returns 401 forbbiden if user creates blog without being logged', async () => {
        const newBlog = {
            title: "Mon blog",
            author: "Jean Némard",
            url: "http://blog.jeannemard.fr",
            likes: 20,
            userId: user._id.toString()
        }

        const response = await api
            .post('/api/blogs')
            .send(newBlog)

        expect(response.status).toBe(401)
    })

    test('it creates a new blog with 0 like by default', async () => {
        const newBlogWithMissingLikesProperty = {
            title: "Mon blog",
            author: "Jean Némard",
            url: "http://blog.jeannemard.fr",
            user: user.id
        }

        const response = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlogWithMissingLikesProperty)

        const newBlog = await Blog.findById(response.body.id)

        expect(newBlog.title).toBe('Mon blog')
        expect(newBlog.likes).toBe(0)
    })


    const blogs = [
        [
            {
                author: "Jean Némard",
                url: "http://blog.jeannemard.fr",
            },
            400
        ],
        [
            {
                title: "Mon blog",
                author: "Jean Némard",
            },
            400
        ]
    ]

    test.each(blogs)('it returns 400 Bad Request if title or url are missing when creating a new blog', async (newBlogWithMissingRequiredProperty, httpResponseStatus) => {
        const response = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlogWithMissingRequiredProperty)
            .expect(httpResponseStatus)
    })

    test('it updates a blog', async () => {
        const blogToUpdateId = '5a422b891b54a676234d17fa'

        const response = await api
            .put(`/api/blogs/${blogToUpdateId}`)
            .send({
                likes: 30
            })

        expect(response.body.likes).toBe(30)

        const updatedBlog = await Blog.findById(blogToUpdateId)

        expect(updatedBlog.likes).toBe(30)
    })

    test('it deletes a blog', async () => {

        const newBlog = {
            title: "Mon blog",
            author: "Jean Némard",
            url: "http://blog.jeannemard.fr",
            likes: 20,
        }

        const createNewBlogResponse = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)

        const blogToDeleteId = createNewBlogResponse.body.id

        const response = await api
            .delete(`/api/blogs/${blogToDeleteId}`)
            .set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(204)

        const result = await Blog.findById(blogToDeleteId)

        expect(result).toBeNull();
    })

    afterAll(async () => {
        await mongoose.connection.close()
    })
})
