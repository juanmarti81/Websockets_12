const socket = io("http://localhost:8080")

const NuevoProducto = document.getElementById("Nuevo_Producto")
const showProducts = document.getElementById("productList")

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
  console.log(res)
  const temp = await res.text() 
  var template = Handlebars.compile(temp);
  const html = template({product})
  showProducts.innerHTML = html
}


