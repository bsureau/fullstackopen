const _ = require('lodash')


const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((totalLikes, post) => totalLikes + post.likes, 0)
}

const favoriteBlog = (blogs) => {
    const favoritePost = blogs.reduce((favoritePost, post) => post.likes > favoritePost.likes ? post : favoritePost)
    return {
        title: favoritePost.title,
        author: favoritePost.author,
        likes: favoritePost.likes,
    }
}

const mostBlogs = (blogs) => {
    const mostBlogs = _.groupBy(blogs, 'author')
    const mostBlogsAuthor = Object.keys(mostBlogs).reduce((mostBlogsAuthor, author) => mostBlogs[author].length > mostBlogs[mostBlogsAuthor].length ? author : mostBlogsAuthor)
    return {
        author: mostBlogsAuthor,
        blogs: mostBlogs[mostBlogsAuthor].length
    }
}

const mostLikes = (blogs) => {
    const mostLikes = _.groupBy(blogs, 'author')
    const mostLikesAuthor = Object.keys(mostLikes).reduce((mostLikesAuthor, author) => _.sumBy(mostLikes[author], 'likes') > _.sumBy(mostLikes[mostLikesAuthor], 'likes') ? author : mostLikesAuthor)
    return {
        author: mostLikesAuthor,
        likes: _.sumBy(mostLikes[mostLikesAuthor], 'likes')
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
