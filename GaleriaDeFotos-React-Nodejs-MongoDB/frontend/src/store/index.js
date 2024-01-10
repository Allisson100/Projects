import { configureStore } from '@reduxjs/toolkit'

import imagesSlice from './reducers/images'
import imagesDBSlice from './reducers/imagesFromDB'
import toastMessageSlice from './reducers/toastMessage'


import { imagesDBListener } from './middlewares/imagesFromDB'

const store = configureStore({
    reducer: {
        imagesObj: imagesSlice,
        imagesDB: imagesDBSlice,
        toastMessage: toastMessageSlice,
    },
    middleware: 
        getDefaultMiddleware => 
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: ['images/postImages'],
                }
            }).prepend(
                imagesDBListener.middleware
            )
})

export default store