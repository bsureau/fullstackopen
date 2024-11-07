import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: [],
    reducers: {
        createNotification(state, action) {
            const notification = action.payload
            state = state.concat(notification)
            return state
        },
        removeNotification(state, action) {
            state = state.filter(notification => notification.id !== action.payload)
            return state
        }
    }
})

export const { createNotification, removeNotification } = notificationSlice.actions

export default notificationSlice.reducer
