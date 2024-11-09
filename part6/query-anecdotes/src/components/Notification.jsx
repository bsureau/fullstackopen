import { useContext } from "react"
import { NotificationContext } from "./NotificationProvider"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const [notifications, dispatchNotification] = useContext(NotificationContext)

  return (
    <>
      {notifications.map(anecdote =>
        < div style={style} key={anecdote.id}>
          {anecdote.content}
        </div >
      )}
    </>
  )
}

export default Notification
