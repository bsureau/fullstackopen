import '../index.css'

const NotificationMessage = ({ message, color }) => {

    return (
        <p className='notification' style={{ backgroundColor: color }}> {message}</p >
    )
}

export default NotificationMessage
