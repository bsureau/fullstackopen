import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { createNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const addNote = (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        dispatch(addAnecdote(anecdote))

        const notificationId = (100000 * Math.random()).toFixed(0)
        dispatch(createNotification({
            id: notificationId,
            content: `you created '${anecdote}'`
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
