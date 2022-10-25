const express = require("express")
const cors = require("cors")
const {Server: HttpServer} = require("http")
const {Server: WebsocketServer} = require("socket.io")

// const handlebars = require("express-handlebars") 
const messageDB = require("./messagesClass")
const Contenedor = require("./productsClass")

let contenedor = new Contenedor()
let messageList = new messageDB()

const app = express()
const httpServer = new HttpServer(app)
const io = new WebsocketServer(httpServer)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

const PORT = process.env.PORT || 8080

app.use(express.static("./public"))

// app.engine(
//   "hbs",
//   handlebars.engine({ extname: ".hbs", defaultLayout: "main.hbs"})
// )

// app.set("view engine", "hbs")
// app.set("views", "./views")

// app.get("/", (req, res) => {
//   console.log("Respuesta")
  
//   res.render("new-product")
// })

// app.get("/productos", async (req, res) => {
//   const products = await contenedor.getAll()
//   res.render("list-products", {product: products})
// })

// app.post("/productos", async (req, res) => {
//   const newProduct = req.body 
//   console.log(newProduct)
//   const save = await contenedor.save(newProduct)
//   const products = await contenedor.getAll()
//   res.render("list-products", {product: products})
// })

// app.get("/productoRandom", async (req, res) => {
//   const products = await contenedor.getAll()
//   const length = Object.keys(products).length
//   const productIndexSelected = Math.floor(Math.random() * length)
//   console.log("VALUE: ", productIndexSelected)
//   console.log("PRODUCT: ", products[productIndexSelected])
//   res.status(200).send(products[productIndexSelected])
// })


const getProducts = async () => {return await contenedor.getAll()}


io.on("connection", socket => {
  returnProducts(socket)
  returnMessages(socket)

  socket.on("new-product", data => {
    console.log(data)
    saveProduct(data)
    
  })

  socket.on("new-message", data => {
    saveMessage(data)
  })
  
})

const returnMessages = async (socket) => {
  socket.emit("AllMessages", await messageList.getAllMessages())
}

const saveMessage = async (data) => {
  await messageList.save(data)
  const messages = await messageList.getAllMessages()
  io.sockets.emit("AllMessages", messages)
}

const returnProducts = async (socket) => {
  socket.emit("AllProducts", await getProducts())
}

const saveProduct = async (data) => {
  await contenedor.save(data)
  const productos = await contenedor.getAll()
  io.sockets.emit("AllProducts", productos)
}

httpServer.listen( PORT, () => console.log(`Server listening on PORT ${PORT}`));