import knex from "knex"

const options_mysql = {
    client: "mysql2",
    version: '8.0',
    connection: {
      host: "www.juanmarti.link",
      port: 9001,
      user: "cl9yrumgv000wcmtghh0i4nyu",
      password: "IUXbxD2Qo9u6rKHj5FQ7TxMs",
      database: "cl9yrumgx000ycmtg2zzhb3cm",
    }
  }
  
const products_db = knex(options_mysql)

class Contenedor {
    constructor (name){};

    async save (Object) {
        try {
            const insert_data = {
                title: Object.title,
                price: Object.price,
                thumbnail: Object.thumbnail
            }
            const insert_action = await products_db.insert(insert_data).into("products")
            console.log(insert_action)
        }catch (err){
            throw new Error(`Error al escribir el archivo: ${err}`)
        }
    }

    async getById(Number){
        const product = await products_db.select("*").from("products").where("id", Number)
        return product
    }

    async getAll(){
        try {
            const data = await products_db.select("*").from("products")
            return data
        } catch (error) {
            throw new Error(`Error reading file ${error}`)
        }
    }

    async deleteById(Number){
        const del_product = await products_db.where("id", Number).del()
        return true
    }

    async deleteAll() {
        const del_all_product = await products_db.del()
    }
}

export default Contenedor



