import express from 'express'
import ImageController from '../controllers/imageController.js'
import upload from '../config/multer.js'

const routes = express.Router()

routes.get('/', ImageController.getAllImages)
routes.post('/', upload.array('file') ,ImageController.postImage)

export default routes