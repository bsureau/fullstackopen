const router = require('express').Router()
const Blog = require('../models/blog')

router.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

router.post('/', async (request, response) => {
    try {
        const blog = new Blog(request.body)
        const result = await blog.save()
        response.status(201).json(result)
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
        // const blog = {
        //     ...postToUpdate,
        //     ...request.body
        // }
        // console.log(blog)
        const updatedBlog = await Blog.findByIdAndUpdate(postToUpdateId, { likes: 30 }, { new: true })
        response.json(updatedBlog)
    } catch (e) {
        response.status(400).json({
            error: e.message
        })
    }
})

router.delete('/:id', async (request, response) => {
    try {
        const postToDeleteId = request.params.id
        await Blog.findByIdAndDelete(postToDeleteId)
        response.status(204).end()
    } catch (e) {
        response.status(400).json({
            error: e.message
        })
    }
})

module.exports = router
