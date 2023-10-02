import z from "zod"

const userSchema = z.object({
	name: z
		.string({
			required_error: "El nombre es requerido",
			invalid_type_error: "El nombre debe ser un string",
		})
		.min(1, {
			message: "El nombre debe tener al menos 1 caracter",
		})
		.max(150, {
			message: "El nombre debe tener como máximo 150 caracteres",
		}),
	email: z
		.string({
			required_error: "El email es requerido",
			invalid_type_error: "El email debe ser un string",
		})
		.email({
			message: "El email debe ser válido",
		}),
	password: z
		.string()
		.min(8, {
			message: "La contraseña debe tener al menos 8 caracteres",
		})
		.max(100),
})

export function validateUser(input) {
	return userSchema.safeParse(input)
}
