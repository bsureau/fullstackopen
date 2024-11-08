import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const getId = () => (100000 * Math.random()).toFixed(0)

    const asObject = (anecdote) => {
        return {
            content: anecdote,
            id: getId(),
            votes: 0
        }
    }

    const addNote = async (event) => {
        event.preventDefault()
        const anecdote = asObject(event.target.anecdote.value)

        dispatch(createAnecdote(anecdote))

        const notificationId = (100000 * Math.random()).toFixed(0)
        dispatch(createNotification({
            id: notificationId,
            content: `you created '${anecdote.content}'`
        }))
        setTimeout(() => dispatch(removeNotification(notificationId)), 5000)
        event.target.anecdote.value = ''
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addNote}>
                <div><input name="anecdote" /></div>
                <button type="submit">create</button>
            </form>
        </>
    )
}

export default AnecdoteForm
