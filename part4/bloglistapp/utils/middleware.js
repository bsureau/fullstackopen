const User = require('../models/user')
const jwt = require('jsonwebtoken')

function tokenExtractor(request, response, next) {
    const authHeader = request.get('authorization');
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return response.status(401).json({ message: 'Token not provided' });
    }

    request.token = token
    next()
}

function userExtractor(request, response, next) {
    const token = request.token
    const secretKey = process.env.SECRET

    jwt.verify(token, secretKey, async (err, decoded) => {
        if (err) {
            return response.status(403).json({ message: 'Invalid token' });
        }

        const user = await User.findById(decoded.id).populate('blogs')
        request.user = user;
        next();
    });
}

module.exports = { tokenExtractor, userExtractor }
