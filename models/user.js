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

export class UserModel {
	static async register({ input }) {
		const { name, email, password, role} = input
    try{
      await connection.query(
        `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`,
        [name, email, password, role]
      )
    } catch (error) {
      console.log(error);
      throw new Error("Error al registrar el usuario")
    }
	}
}
