import axios from "axios"

const baseUrl = "http://localhost:3000"

const getAll = async () => {
    const response = await axios.get(`${baseUrl}/anecdotes`)
    return response.data
}

const create = async (anecdote) => {
    await axios
        .post(`${baseUrl}/anecdotes`, anecdote)
}

const vote = async (anecdote) => {
    const updatedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1
    }
    await axios
        .put(`${baseUrl}/anecdotes/${anecdote.id}`, updatedAnecdote)
}

export default { getAll, create, vote }
