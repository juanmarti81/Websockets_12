// const socket = io(`http://localhost:8080`)
const socket = io("http://websockets.juanmarti.link")

const NuevoProducto = document.getElementById("Nuevo_Producto")
const showProducts = document.getElementById("productList")
const NuevoMensaje = document.getElementById("Nuevo_Mensaje")
const showMessages = document.getElementById("messages_List")

NuevoProducto.addEventListener("submit", (e) => {
  e.preventDefault()
  const data = new FormData(NuevoProducto)
  const values = Object.fromEntries(data)
  NuevoProducto.reset()
  socket.emit("new-product", values)
  console.log(values)
})

socket.on("AllProducts", data => {
  productList(data)
})

const productList = async (product) => {
  const res = await fetch("./list-products.hbs")
  const temp = await res.text() 
  const template = Handlebars.compile(temp);
  const html = template({product})
  showProducts.innerHTML = html
}

NuevoMensaje.addEventListener("submit", (e) => {
  e.preventDefault()
  const data = new FormData(NuevoMensaje)
  const values = Object.fromEntries(data)
  NuevoMensaje.reset()
  socket.emit("new-message", values)
  console.log(values)
})

socket.on("AllMessages", data => {
  MessageList(data)
})

const MessageList = async (messages) => {
  const res = await fetch("./chat.hbs")
  const temp = await res.text()
  const template = Handlebars.compile(temp)
  const html = template({messages})
  showMessages.innerHTML = html
}