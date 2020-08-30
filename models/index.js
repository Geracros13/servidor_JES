const mongoose = require("mongoose");
const Schema = mongoose.Schema; //Descripcion de que es lo que queremos guardar en la BD

newSchema = new Schema({
  name: String,
  ubicacion: String,
  telefono: Number,
});

module.exports = mongoose.model("User", newSchema);
