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
	static async registerUser({ input }) {
		const { name, email, password } = input
		try {
			await connection.query(
				`INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
				[name, email, password]
			)
		} catch (error) {
			console.log(error)
			throw new Error("Error al registrar el usuario")
		}
	}

	static async emailExists(email) {
		const [rows] = await connection.query(
			`SELECT COUNT(*) as count FROM users WHERE email = ?`,
			[email]
		)
		return rows[0].count > 0
	}
}
