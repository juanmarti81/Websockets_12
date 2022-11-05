import knex from "knex"

const options_sqlite3 = {
  client: "sqlite3",
  connection: { filename : "./db/ecommerce.db" }
}

const messages_db = knex(options_sqlite3)

class messageDB {
  constructor(file){
  }

  async save(data){
    try {
        const message = {
          email: data.email,
          message: data.message,
          created_at: new Date().toLocaleDateString("es-AR") + " " + new Date().toLocaleTimeString("es-AR"),
        }
        const save_message = await messages_db.insert(message).into("messages")
        console.log(save_message)
      } catch (err) {
        console.log(`Error al guardar el mensaje: ${err}`)
    }
  }

  async getAllMessages () {
    try {
      const data = await messages_db.select("*").from("messages")
      return data
    } catch (error) {
      console.log(`Error al leer los mensajes: ${err}`)
    }
  }
}

export default messageDB