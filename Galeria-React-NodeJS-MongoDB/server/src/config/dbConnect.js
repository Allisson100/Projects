import 'dotenv/config'
import mongoose from 'mongoose'

async function connectDatabase() {
    mongoose.connect(process.env.MONGOURL)

    return mongoose.connection
}

export default connectDatabase