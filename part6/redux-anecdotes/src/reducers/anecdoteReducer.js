import { createSlice } from "@reduxjs/toolkit"
import anecdotesService from "../services/anecdotesService"

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      state = action.payload
      return state
    },
    vote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(anecdote => anecdote.id === id)
      const changedAnecdote = { ...anecdoteToChange, votes: anecdoteToChange.votes + 1 }
      return state
        .map(anecdote => anecdote.id === id ? changedAnecdote : anecdote)
    },
    addAnecdote(state, action) {
      const anecdote = action.payload
      return [...state, anecdote]
    }
  }
})

export const { vote, addAnecdote, setAnecdotes } = anecdotesSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (anecdote) => {
  return async (dispatch) => {
    await anecdotesService.create(anecdote)
    dispatch(addAnecdote(anecdote))
  }
}

export const voteForAnecdote = (anecdote) => {
  return async (dispatch) => {
    await anecdotesService.vote(anecdote)
    dispatch(vote(anecdote.id))
  }
}

export default anecdotesSlice.reducer
