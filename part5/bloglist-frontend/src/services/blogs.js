import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (userToken) => {
  token = userToken
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (blog) => {
  const response = await axios.post(baseUrl, blog, { headers: { Authorization: `Bearer ${token}` } })
  return response.data
}

const addLike = async (blogId) => {
  await axios.put(`${baseUrl}/${blogId}`)
}

const deleteBlog = async (blogId) => {
  await axios.delete(`${baseUrl}/${blogId}`, { headers: { Authorization: `Bearer ${token}` } })
}

export default { getAll, setToken, create, addLike, deleteBlog }
