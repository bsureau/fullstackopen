import { createContext, useReducer } from "react"


const notificationReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_NOTIFICATION':
            return state.concat(action.payload)
        case 'DELETE_NOTIFICATION':
            return state.filter(notification => notification.id !== action.payload)
        default:
            return state
    }
}

export const NotificationContext = createContext()

const NotificationProvider = (props) => {

    const [notifications, dispatchNotification] = useReducer(notificationReducer, [])

    return (
        <NotificationContext.Provider value={[notifications, dispatchNotification]} >
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationProvider
