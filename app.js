import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import {Server as HttpServer} from "http"
import {Server as WebsocketServer} from "socket.io"

import messageDB from "./models/messagesClass.js"
import Contenedor from "./models/productsClass.js"
let contenedor = new Contenedor()
let messageList = new messageDB()

const app = express()
const httpServer = new HttpServer(app)
const io = new WebsocketServer(httpServer)
dotenv.config()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

const PORT = process.env.PORT || 8080

console.log("URL:", process.env.URL)

app.use(express.static("./public"))

const getProducts = async () => {return await contenedor.getAll()}

io.on("connection", socket => {
  returnProducts(socket)
  returnMessages(socket)

  socket.on("new-product", data => {
    console.log(data)
    saveProduct(data)
    
  })

  socket.on("new-message", data => {
    console.log("Nuevo Mensaje: ", data)
    saveMessage(data)
  })
  
})

// ?MESSAGES HANDLING
const returnMessages = async (socket) => {
  socket.emit("AllMessages", await messageList.getAllMessages())
}

const saveMessage = async (data) => {
  await messageList.save(data)
  const messages = await messageList.getAllMessages()
  io.sockets.emit("AllMessages", messages)
}

// !PRODUCTS HANDLING
const returnProducts = async (socket) => {
  socket.emit("AllProducts", await getProducts())
}

const saveProduct = async (data) => {
  await contenedor.save(data)
  const productos = await contenedor.getAll()
  io.sockets.emit("AllProducts", productos)
}

httpServer.listen( PORT, () => console.log(`Server listening on PORT ${PORT}`));