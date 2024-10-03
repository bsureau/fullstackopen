const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: String,
    url: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = doc._id
            delete ret._id
        }
    }
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog