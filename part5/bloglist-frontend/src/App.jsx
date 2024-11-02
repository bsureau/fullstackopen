import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import NewBlogForm from './components/BlogForm'
import { jwtDecode } from 'jwt-decode'

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
      const { id: userId } = jwtDecode(user.token)
      user.id = userId
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
    const fetchData = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs.sort((a, b) => a.likes - b.likes))
    }
    fetchData()
  }, [])

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

  const createNewBlog = async (title, author, url) => {
    const newBlog = await blogService.create({ title, author, url })
    setBlogs([newBlog, ...blogs])
  }

  const addLike = async (blog) => {
    await blogService.addLike(blog.id)
    setBlogs(blogs
      .map(b => b.id === blog.id ? { ...b, likes: b.likes + 1 } : b)
      .sort((a, b) => a.likes - b.likes)
    )
  }

  const deleteBlog = async (blog) => {
    const confirm = window.confirm(`Are you sure you want to delete ${blog.title} ?`)
    if (confirm) {
      await blogService.deleteBlog(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
    }
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
          <Togglable closedButtonLabel='create new blog' openedButtonLabel='cancel'>
            <NewBlogForm addBlog={createNewBlog} />
          </Togglable>
        </div>
      }
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} addLike={addLike} deleteBlog={deleteBlog} />
      )}
    </div>
  )
}

export default App
