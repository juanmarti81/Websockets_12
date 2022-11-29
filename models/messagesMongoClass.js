import mongoose from "mongoose";
import messages from "./messagesModel.js";
import normalizr from "normalizr";

const normalizar = normalizr.normalize
const desnormalizar = normalizr.denormalize

const usuarioSchema = new normalizr.schema.Entity('usuario')
const textoSchema = new normalizr.schema.Entity('texto')
const mensajeSchema = new normalizr.schema.Entity('mensaje', [{
  author: usuarioSchema,
  text: textoSchema
}], {idAttribute: '_id'})


class messagesContainer {
  constructor() {
    const conn = mongoose.connect("mongodb://cla1m94tj0010cmtge7eh10jo:G4tcKtviZAbVzjuDxVKdK2lk@www.juanmarti.link:9002/?readPreference=primary&ssl=false");
    console.log(conn)
  }
  
  async save(newMessage) {
    const message = {
      _id: newMessage.email,
      author: {
        nombre: newMessage.nombre,
        apellido: newMessage.apellido,
        edad: newMessage.edad,
        alias: newMessage.alias,
        avatar: newMessage.avatar,
      },
      text: newMessage.message,
    }
    await messages.insertMany(message);
  }

  async getAllMessages() {
    const data = await messages.find({});
    console.log(data)
    const normalizedData = normalizar(data, [mensajeSchema])
    console.log(normalizedData)
    return normalizedData;
  }
}

export default messagesContainer;

