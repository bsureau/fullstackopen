const router = require('express').Router()
const Blog = require('../models/blog')
const middlewares = require('../utils/middleware')

router.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {
        username: 1,
        name: 1,
        id: 1
    })
    response.json(blogs)
})

router.post('/', [middlewares.tokenExtractor, middlewares.userExtractor], async (request, response) => {
    try {
        const body = request.body
        const user = request.user
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            user: user.id
        })
        const newBlog = await blog.save()
        user.blogs = user.blogs.concat(newBlog._id)
        await user.save()
        response.status(201).json(newBlog)
    } catch (e) {
        response.status(400).json({
            error: e.message
        })
    }
})

router.put('/:id', async (request, response) => {
    try {
        const postToUpdateId = request.params.id
        const postToUpdate = await Blog.findById(postToUpdateId)
        const updatedBlog = await Blog.findByIdAndUpdate(postToUpdateId, { likes: postToUpdate.likes + 1 }, { new: true })
        response.json(updatedBlog)
    } catch (e) {
        response.status(400).json({
            error: e.message
        })
    }
})

router.delete('/:id', [middlewares.tokenExtractor, middlewares.userExtractor], async (request, response) => {
    try {
        const blogToDeleteId = request.params.id
        const blogToDelete = await Blog.findById(blogToDeleteId);

        const user = request.user

        if (blogToDelete.user.toString() !== user.id) {
            return response.status(401).json({
                error: 'forbidden access'
            })
        }

        await Blog.deleteOne(blogToDelete)
        response.status(204).end()
    } catch (e) {
        response.status(400).json({
            error: e.message
        })
    }
})

module.exports = router
