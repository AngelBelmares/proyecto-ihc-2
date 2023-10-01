import { validateUser } from '../schemas/users.js'
import { UserModel } from '../models/prenda.js'

export class UserController{
  register = async (req, res) => {
    try {
      const result = validateUser(req.body);
      if(result.success){
        const newUser = await UserModel.register({ result: result.data });
        res.render("register.ejs", { newUser })
      }
      res.status(400).send(result.error);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error interno del servidor');
    }
  }
}