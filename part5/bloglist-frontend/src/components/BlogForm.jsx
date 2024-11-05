import { useState } from "react"
import blogService from '../services/blogs'

const NewBlogForm = ({ addBlog }) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)

    const handleCreateNewBlog = async (event) => {
        try {
            event.preventDefault()
            await addBlog(title, author, url)
            setSuccessMessage(`new Blog '${title}' created!`)
            setTimeout(() => { setSuccessMessage('') }, 5000)
            setTitle('')
            setAuthor('')
            setUrl('')
        } catch (error) {
            setErrorMessage('Could not create new blog')
            setTimeout(() => { setErrorMessage('') }, 5000)
        }
    }

    return (
        <div>
            <h2>create new blog</h2>
            {errorMessage !== null && <p>{errorMessage}</p>}
            {successMessage !== null && <p>{successMessage}</p>}
            <form onSubmit={handleCreateNewBlog}>
                <div>
                    Tiltle:
                    <input type="text" name="title" value={title} placeholder="blog title" onChange={({ target }) => { setTitle(target.value) }} />
                </div>
                <div>
                    Author:
                    <input type="text" name="author" value={author} placeholder="blog author" onChange={({ target }) => { setAuthor(target.value) }} />
                </div>
                <div>
                    URL:
                    <input type="text" name="url" value={url} placeholder="blog url" onChange={({ target }) => { setUrl(target.value) }} />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default NewBlogForm
