import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAll, vote } from './requests'
import { useContext } from 'react'
import { NotificationContext } from './components/NotificationProvider'

const App = () => {

  const queryClient = useQueryClient()

  const voteAnecdoteMutation = useMutation({
    mutationFn: vote,
    onSuccess: () => {
      queryClient.invalidateQueries(['anecdotes'])
    }
  })

  const getId = () => (100000 * Math.random()).toFixed(0)

  const asObject = (notification) => {
    return {
      id: getId(),
      content: notification
    }
  }
  const [notifications, dispatchNotification] = useContext(NotificationContext)

  const handleVote = (anecdote) => {
    anecdote.votes += 1
    voteAnecdoteMutation.mutate(anecdote)

    const notification = asObject(`You voted '${anecdote.content}'`)
    dispatchNotification({
      type: 'ADD_NOTIFICATION',
      payload: notification
    })

    setTimeout(() => dispatchNotification({
      type: 'DELETE_NOTIFICATION',
      payload: notification.id
    }), 5000)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll
  })

  if (result.isLoading) {
    return <div>loading...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
