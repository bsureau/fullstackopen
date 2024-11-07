import { useSelector } from "react-redux"

const Notification = () => {

  const notifications = useSelector(state => state.notifications)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <>
      {
        notifications.map(notification =>
          <div style={style} key={notification.id}>
            {notification.content}
          </div>
        )
      }
    </>
  )
}

export default Notification
