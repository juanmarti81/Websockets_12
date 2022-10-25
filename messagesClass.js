const fs = require("fs")


module.exports = class messageDB {

  // email = ""
  // message = ""
  // datetime = new Date().toISOString()

  file = ""

  constructor(file){
    this.file = "./messages.txt"
  }

  async save(data){
    try {
        const readfile = await fs.promises.readFile(this.file, 'utf-8')
        let messages = JSON.parse(readfile)
        const newMessage = {...data, id: messages.length + 1, date: new Date().toLocaleDateString("es-AR") + " " + new Date().toLocaleTimeString("es-AR")}
        messages.push(newMessage)
        await fs.promises.writeFile(this.file, JSON.stringify(messages),'utf-8')
      } catch (err) {
        throw new Error(`Error al escribir el archivo: ${err}`)
    }
  }

  async getAllMessages () {
    try {
      const archivo = await fs.promises.readFile(this.file, 'utf-8')
      return JSON.parse(archivo)
    } catch (error) {
        throw new Error(`Error reading file ${error}`)
    }
  }
}
