const express = require("express");
const User = require("../models/index"); //Importamos la BD
const router = express.Router(); //Direccionamiento hace referencia a la definición de puntos finales de aplicación (URI

router.get("/", (req, res) => {
  User.find({}, (err, data) => {
    res.json(data);
  });
});

router.get("/:id", (req, res) => { // rutas dinámicas : y lo que queremos recibir :id
  User.findById(req.params.id, (err, data) => { // params, parámetro de la petición 
    res.json(data); // Especificar que vamos a devolver un objeto json
  });
});

router.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "Registro borrado" });
});

router.post("/", (req, res) => {
  user = new User({
    name: req.body.name, // body recibe los datos que me esta enviando el frontend cuerpo de la petición 
    ubicacion: req.body.ubicacion,
    telefono: req.body.telefono,
  });
  user.save(() => {
    res.json(user);
  });
});

router.put("/:id", async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Registro Actualizado" });
});

module.exports = router;
