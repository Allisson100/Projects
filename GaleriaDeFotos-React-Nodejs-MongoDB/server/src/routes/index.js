import express from 'express'
import images from './imagesRoutes.js'

const routes = (app) => {
    app.use(express.json())

    app.use('/images', images)
}

export default routes