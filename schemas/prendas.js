import z from 'zod'

const prendaSchema = z.object({
  name: z.string().min(1).max(150),
  type: z.string().min(1).max(50),
  size: z.array(
    z.enum(['XS', 'S', 'M', 'L', 'XL'])
  ),
  color: z.string().min(1).max(50),
  price: z.string().regex(/^\d{1,5}(\.\d{1,2})?$/),
  stock: z.number().int().min(0).max(10000),
  description: z.string().min(1).max(512),
  image: z.string().min(1).max(255).url().default('https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg'),
})

export function validatePrenda (input) {
  return prendaSchema.SafeParse(input)
}