// punto de entrada de la aplicacion
import express from "express"
const app = express()
import { PrendaController } from "./controllers/prendas.js"

app.use(express.static("public"))

// pasar port por variable de entorno
const PORT = process.env.PORT ?? 3004

const prendaController = new PrendaController();
const userController = new UserController();

app.get("/", prendaController.getAll)
app.get("/prenda/:id", prendaController.getById)
app.get("/register", userController.register)

app.use((req, res) => {
	res.status(404).send("404 not found")
})

app.listen(PORT, () => {
	console.log(`Server on port http://localhost:${PORT}`)
})
