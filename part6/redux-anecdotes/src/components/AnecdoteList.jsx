import { useSelector, useDispatch } from 'react-redux'
import { vote as voteAction } from '../reducers/anecdoteReducer'
import { createNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state =>
        state.anecdotes
            .filter(anecdote => anecdote.content.includes(state.filter) === true)
            .sort((a, b) => a.votes < b.votes ? 1 : -1)
    )
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        dispatch(voteAction(anecdote.id))
        const notificationId = (100000 * Math.random()).toFixed(0)
        dispatch(createNotification({
            id: notificationId,
            content: `you voted '${anecdote.content}'`
        }))
        setTimeout(() => dispatch(removeNotification(notificationId)), 5000)
    }

    return (
        <>
            {
                anecdotes.map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => vote(anecdote)}>vote</button>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default AnecdoteList
