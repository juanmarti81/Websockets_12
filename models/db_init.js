import knex from "knex";

const options_sqlite3 = {
  client: "sqlite3",
  connection: { filename : "./db/ecommerce.db" }
}

const messages_db = knex(options_sqlite3)

messages_db.schema.hasTable("messages").then(exists => {
  if (!exists) {
    return messages_db.schema.createTable("messages", table => {
            table.increments("id");
            table.string("email").notNullable();
            table.string("message").notNullable();
            table.timestamps("timestamp");
          })
  }
})

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

products_db.schema.hasTable("products").then(exists => {
  if (!exists) {
    return products_db.schema.createTable("products", table => {
      table.increments("id");
      table.string("title", 250).notNullable();
      table.decimal("price", 65, 2).notNullable();
      table.text("thumbnail");
    })
  }
})

