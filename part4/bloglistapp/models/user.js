const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 3
    },
    name: String,
    passwordHash: {
        type: String,
        required: true
    },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
}, {
    toJSON: {
        transform(document, returnedObject) {
            returnedObject.id = document.id.toString()
            delete returnedObject._id
            delete returnedObject.__v
            delete returnedObject.passwordHash
        }
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User
