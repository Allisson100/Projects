import { createSlice } from '@reduxjs/toolkit'

const imagesSlice = createSlice({
    name: 'files',
    initialState: [],
    reducers: {
        addImagesObj: (state,{ payload }) => {
            state.push(...payload)
        },
        removeImageObj: (state, { payload }) => {

            const newState = state.filter(state => state.id !== payload)

            return newState
        },
        reset: () => {
            return []
        }
    }
})

export const { addImagesObj , removeImageObj , reset } = imagesSlice.actions

export default imagesSlice.reducer