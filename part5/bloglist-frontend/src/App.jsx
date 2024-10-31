import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import NewBlogForm from './components/BlogForm'

const App = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem('user', JSON.stringify(user))
      blogService.setToken(user.token)
      setSuccessMessage('Connected!')
      setTimeout(() => { setSuccessMessage(null) }, 5000)
    } catch (error) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    setUser(null)
    localStorage.removeItem('user')
  }

  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const handleAddNewBlog = (newBlog) => {
    setBlogs([...blogs, newBlog])
  }

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          Username:
          <input
            name="username"
            type="text"
            value={username}
            onChange={({ target }) => { setUsername(target.value) }}
          />
        </div>
        <div>
          Password:
          <input
            name="password"
            type="password"
            value={password}
            onChange={({ target }) => { setPassword(target.value) }}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    )
  }

  return (
    <div>
      {errorMessage !== null && <p>{errorMessage}</p>}
      {successMessage !== null && <p>{successMessage}</p>}
      {user === null
        ? loginForm()
        : <div>
          <div>
            {user.username} logged in
            <button onClick={handleLogout}>logout</button>
          </div>
          <NewBlogForm onBlogCreate={handleAddNewBlog} />
        </div>
      }
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
