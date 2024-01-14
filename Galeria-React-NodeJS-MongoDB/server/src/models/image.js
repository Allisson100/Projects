import mongoose from "mongoose"

const imageSchema = new mongoose.Schema({

    id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, required: true},
    src: { type: String, required: true }

}, {versionKey: false, timestamps: true})

const image = mongoose.model('images', imageSchema)

export default image