import { createSlice } from '@reduxjs/toolkit'

const toastMessageSlice = createSlice({
    name: 'toast',
    initialState: [],
    reducers: {
        addMessage: (state,{ payload }) => {
            return payload
        },
        resetToast: () => {
            return []
        }
    }
})

export const { addMessage , resetToast } = toastMessageSlice.actions

export default toastMessageSlice.reducer