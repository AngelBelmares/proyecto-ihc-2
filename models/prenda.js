import mysql from "mysql2/promise"

const DEFAULTCONFIG = {
	host: "localhost",
	user: "root",
	port: 3306,
	password: "root123",
	database: "clothingdb",
}

const connectionString = process.env.DATABASE_URL ?? DEFAULTCONFIG

const connection = await mysql.createConnection(connectionString)

export class PrendasModel{
  static async getAll () {
    const [prendas] = await connection.query('SELECT id, name, price, image FROM clothing')
    return prendas
  }

  static async getById ({ id }) {
    const [prenda] = await connection.query('SELECT * FROM clothing WHERE id = ?', [id])
    return prenda[0]
  }
}