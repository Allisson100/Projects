import { createListenerMiddleware } from "@reduxjs/toolkit";
import { addImagesDB, getAllImagesDB, getImagesDbGallery, postImagesDB } from "../reducers/imagesFromDB";
import imagesDBService from "../../services/imagesFromDB";
import { reset } from "../reducers/images";
import { addMessage } from "../reducers/toastMessage";

export const imagesDBListener = createListenerMiddleware()

imagesDBListener.startListening({
    actionCreator: getAllImagesDB,
    effect: async (action, { fork , dispatch }) => {

        const api = fork(async () => {
            return await imagesDBService.getImagesDB();
        });

        const response = await api.result

        dispatch(addImagesDB(response.value))
    }
})

imagesDBListener.startListening({
    actionCreator: postImagesDB,
    effect: async (action, { fork , dispatch }) => {

        const images = action.payload

        const api = fork(async () => {
            return await imagesDBService.postImages(images);
        });

        const response = await api.result

        if(response.status === 'ok') {

            dispatch(getAllImagesDB())
            console.log('Fui chamado');
            dispatch(addMessage([{
                message: 'Image(s) sent successfully',
                status: 'success'
            }]))

        } else {
            dispatch(addMessage([{
                message: 'Image(s) not sent. Try again!',
                status: 'failed'
            }]))
        }

        dispatch(reset())
    }
})

imagesDBListener.startListening({
    actionCreator: getImagesDbGallery,
    effect: async (action, { fork , dispatch , getState , unsubscribe }) => {

        const { imagesDB } = getState()

        if(imagesDB.length > 0) return unsubscribe()

        const api = fork(async () => {
            return await imagesDBService.getImagesDB();
        });

        const response = await api.result

        dispatch(addImagesDB(response.value))
    }
})