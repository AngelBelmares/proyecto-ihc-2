// punto de entrada de la aplicacion

import express from 'express';
const app = express();

app.use(express.static("public"))

// pasar port por variable de entorno
const PORT = process.env.PORT ?? 3004;

app.get('/', (req, res) => {
  res.render('index.ejs');
});


app.listen(PORT, () => {
  console.log(`Server on port http://localhost:${PORT}`);
})
