import axios from "axios"

const baseUrl = 'http://localhost:3001'

export const getAll = async () => {
    const response = await axios.get(`${baseUrl}/anecdotes`)
    return response.data
}

export const create = async (anecdote) => {
    await axios.post(`${baseUrl}/anecdotes`, anecdote)
    return anecdote
}

export const vote = async (anecdote) => {
    await axios.put(`${baseUrl}/anecdotes/${anecdote.id}`, anecdote)
    return anecdote
}

