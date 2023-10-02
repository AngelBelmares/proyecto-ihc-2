// punto de entrada de la aplicacion
import express from "express"
import { PrendaController } from "./controllers/prendas.js"
import { UserController } from "./controllers/users.js"
import bodyParser from "body-parser";


const app = express()
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }));

// pasar port por variable de entorno
const PORT = process.env.PORT ?? 3004

const prendaController = new PrendaController();
const userController = new UserController();

app.get("/", prendaController.getAll)
app.get("/prenda/:id", prendaController.getById)

app.get("/login", userController.loginPage)
app.get("/register", userController.registerPage)
app.post("/register", userController.registerUser)

app.use((req, res) => {
	res.status(404).send("404 not found")
})

app.listen(PORT, () => {
	console.log(`Server on port http://localhost:${PORT}`)
})

