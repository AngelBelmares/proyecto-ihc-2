import z from 'zod'

const userSchema = z.object({
  name: z.string().min(1).max(150),
  email: z.string().email(),
  password: z.string().min(8).max(100),
  role: z.enum(['admin', 'user']),
})

export function validateUser (input) {
  return userSchema.safeParse(input)
} 