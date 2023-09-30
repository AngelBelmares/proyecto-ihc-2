import { validatePrenda } from '../schemas/prendas.js'
import { PrendasModel } from '../models/prenda.js'

export class PrendaController{
  getAll = async (req, res) => {
    try {
      const prendas = await PrendasModel.getAll();
      res.render("index.ejs", { prendas })
    } catch (error) {
      console.log(error);
      res.status(500).send('Error interno del servidor');
    }
  }

  getById = async (req, res) => {
    try {
      const { id } = req.params;
      const prenda = await PrendasModel.getById({ id });
      res.render("prenda.ejs", { prenda })
    } catch (error) {
      console.log(error);
      res.status(500).send('Error interno del servidor');
    }
  }
}