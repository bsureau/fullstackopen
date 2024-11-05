import Togglable from "./Togglable"
import { jwtDecode } from 'jwt-decode'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}


const Blog = ({
  blog,
  user,
  addLike,
  deleteBlog
}) => {

  return (
    <div style={blogStyle} className="blog">
      {blog.title} {blog.author}
      <Togglable closedButtonLabel='view' openedButtonLabel='hide'>
        <div>
          {blog.url}<br />
          likes: {blog.likes} <button onClick={() => { addLike(blog) }}>like</button><br />
          {user && user.id === blog.user?.id &&
            <button onClick={() => { deleteBlog(blog) }}>delete</button>
          }
        </div>
      </Togglable>
    </div>
  )
}


export default Blog
