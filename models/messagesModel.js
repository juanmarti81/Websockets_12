import mongoose from "mongoose";

const messageCollection = "messages"

const messagesSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  author: {
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    edad: { type: Number, required: true },
    alias: { type: String, required: true },
    avatar: { type: String, required: true },
  },
  text: { type: String, required: true },
}, {_id: false})

const messages = new mongoose.model(messageCollection, messagesSchema)

export default messages