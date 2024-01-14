import { createAction, createSlice } from "@reduxjs/toolkit";

export const getAllImagesDB = createAction('images/getAllImagesDB')
export const postImagesDB = createAction('images/postImages')
export const getImagesDbGallery = createAction('images/getImagesDbGallery')

const imagesDBSlice = createSlice({
    name: 'imagesDB',
    initialState: [],
    reducers: {
        addImagesDB: (state, { payload }) => {
            return payload
        }
    }
})

export const { addImagesDB } = imagesDBSlice.actions

export default imagesDBSlice.reducer