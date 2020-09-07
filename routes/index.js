const express = require("express");
const User = require("../models/index"); //Importamos la BD
const router = express.Router(); //Direccionamiento hace referencia a la definición de puntos finales de aplicación (URI

/**
 * @swagger
 *
 * /api:
 *  get:
 *      description: Creacion de Fiscalias
 *      responses:
 *        200:
 *           description: Se agrego con exito la fiscalia
 */

router.get("/", (req, res) => {
  User.find({}, (err, data) => {
    res.json(data);
  });
});

/**
 * @swagger
 *
 * /api/{id}:
 *  get:
 *      description: Consultar por ID
 *      parameters:
 *          - name: id
 *            description: ID de la fiscalia
 *            in: path
 *            type: string
 *            required: true
 *      responses:
 *        200:
 *           description: Se agrego con exito la fiscalia
 */
router.get("/:id", (req, res) => {
  // rutas dinámicas : y lo que queremos recibir :id
  User.findById(req.params.id, (err, data) => {
    // params, parámetro de la petición
    res.json(data); // Especificar que vamos a devolver un objeto json
  });
});

/**
 * @swagger
 *
 * /api/{id}:
 *  delete:
 *      description: Borrar Fiscalia por ID
 *      parameters:
 *          - name: id
 *            description: ID de la fiscalia a borrar
 *            in: path
 *            type: string
 *            required: true
 *      responses:
 *        200:
 *           description: Se borro con exito la fiscalia
 */
router.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "Registro borrado" });
});

/**
 * @swagger
 *
 * /api:
 *  post:
 *      description: Crear Fiscalia
 *      parameters:
 *          - name: Nombre
 *            description: Nombre de la fiscalia
 *            in: body
 *            schema:
 *              type: object
 *              properties:
 *                  name:
 *                    type: string
 *                  ubicacion:
 *                    type: string
 *                  telefono:
 *                    type: number
 *              required:
 *                  - name
 *                  - ubicacion
 *                  - telefono
 *      responses:
 *        200:
 *           description: Se creo con exito la fiscalia
 */
router.post("/", (req, res) => {
  user = new User({
    name: req.body.name, // body recibe los datos que me esta enviando el frontend cuerpo de la petición
    ubicacion: req.body.ubicacion,
    telefono: req.body.telefono,
  });
  user.save(() => {
    //Para guardar en la BD
    res.json(user);
  });
});

/**
 * @swagger
 *
 * /api/{id}:
 *  put:
 *      description: Actualizar Fiscalia
 *      parameters:
 *          - name: id
 *            description: ID de la fiscalia a actualizar
 *            in: path
 *            type: string
 *            required: true
 *          - name: Nombre
 *            description: Nombre de la fiscalia
 *            in: body
 *            schema:
 *              type: object
 *              properties:
 *                  name:
 *                    type: string
 *                  ubicacion:
 *                    type: string
 *                  telefono:
 *                    type: number
 *              required:
 *                  - name
 *                  - ubicacion
 *                  - telefono
 *      responses:
 *        200:
 *           description: Se actualizo con exito la fiscalia
 */
router.put("/:id", async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Registro Actualizado" });
});

module.exports = router;
