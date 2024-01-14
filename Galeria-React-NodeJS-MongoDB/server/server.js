import express from "express";
import connectDatabase from "./src/config/dbConnect.js";
import routes from "./src/routes/index.js";
import cors from 'cors'

const app = express()
app.use(cors())

const PORT = process.env.PORT || 8000

const connection = await connectDatabase()

app.use('/uploads', express.static('./src/uploads'));

connection.on('error', (error) => {
    console.error('Connection Error: ', error)
})

connection.once('open', () => {
    console.log('Database connected');
})

routes(app)

app.listen(PORT, () => {
    console.log('Server running!');
})