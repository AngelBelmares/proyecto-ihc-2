import { validateUser } from "../schemas/users.js"
import { UserModel } from "../models/user.js"

export class UserController {
	loginPage = async (req, res) => {
		res.render("login.ejs", { error: null })
	}

	loginUser = async (req, res) => {
		try {
			const user = await UserModel.loginUser({ input: req.body })
			if (user) {
				req.session.user = user
				res.redirect("/")
			}
		} catch (error) {
			res
				.status(500)
				.render("login.ejs", { error: "Correo y/o contraseña incorrectas" })
		}
	}

	registerPage = async (req, res) => {
		res.render("register.ejs", { error: null, newUser: null })
	}

	registerUser = async (req, res) => {
		try {
			const result = validateUser(req.body)

			if (result.success) {
				const isEmailExists = await UserModel.emailExists(req.body.email)
				if (isEmailExists) {
					return res.render("register.ejs", {
						error: "Ya existe un usuario con ese email",
						newUser: null,
					})
				}
				await UserModel.registerUser({ input: result.data })
				res.render("register.ejs", { error: null, newUser: true })
			}
		} catch (error) {
			res.status(500).send("Internal Server Error")
		}
	}
}
