import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice ({
    name: 'notification',
    initialState: '',
    reducers: {
        createNotification(state, action) {
            return action.payload
        }
    }
})

export const { createNotification } = notificationSlice.actions

export const setNotification = (words, seconds) => {
    return dispatch => {
        dispatch(createNotification(words))
        setTimeout(() => {
            dispatch(createNotification(''))
        }, seconds * 1000)
    }
}

export default notificationSlice.reducer

