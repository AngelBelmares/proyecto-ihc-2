import { validateUser } from "../schemas/users.js"
import { UserModel } from "../models/user.js"
import { clearParserCache } from "mysql2"

export class UserController {
	loginPage = async (req, res) => {
		res.render("login.ejs")
	}
	
	registerPage = async (req, res) => {
		res.render("register.ejs")
	}

	registerUser = async (req, res) => {
		try {
			const result = validateUser(req.body);
			if (result.success) {
				const isEmailExists = await UserModel.emailExists(req.body.email);
				if (isEmailExists) {
					return res.render("register.ejs", {
						error: "Ya existe un usuario con ese email",
					});
				}
				const newUser = await UserModel.registerUser({ input: result.data });
				console.log(newUser);
				res.render("register.ejs", { newUser });
			}
		} catch (error) {
			res.status(500).send("Internal Server Error");
		}
	};
}
