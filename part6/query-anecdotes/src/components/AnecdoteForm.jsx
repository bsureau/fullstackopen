import { useMutation, useQueryClient } from "@tanstack/react-query"
import { create } from "../requests"
import { NotificationContext } from "./NotificationProvider"
import { useContext } from "react"

const AnecdoteForm = () => {

  const getId = () => (100000 * Math.random()).toFixed(0)

  const asObject = (anecdote) => {
    return {
      content: anecdote,
      id: getId(),
      votes: 0
    }
  }

  const notificationAsObject = (notification) => {
    return {
      id: getId(),
      content: notification
    }
  }

  const [notification, dispatchNotification] = useContext(NotificationContext)

  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation({
    mutationFn: create,
    onSuccess: (anecdote) => {
      const notification = notificationAsObject(`${anecdote.content} created!`)
      dispatchNotification({
        type: 'ADD_NOTIFICATION',
        payload: notification
      })
      setTimeout(() => {
        dispatchNotification({
          type: 'DELETE_NOTIFICATION',
          payload: notification.id
        })
      }, 5000)
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: () => {
      const notification = notificationAsObject('too short anecdote, must have lenght 5 or more')
      dispatchNotification({
        type: 'ADD_NOTIFICATION',
        payload: notification
      })
      setTimeout(() => {
        dispatchNotification({
          type: 'DELETE_NOTIFICATION',
          payload: notification.id
        })
      }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    const anecdoteToCreate = asObject(content)
    newAnecdoteMutation.mutate(anecdoteToCreate)
    event.target.anecdote.value = ''
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
