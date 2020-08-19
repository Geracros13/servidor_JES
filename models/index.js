const mongoose = require("mongoose");
const Schema = mongoose.Schema;

newSchema = new Schema({
  name: String,
  ubicacion: String,
  telefono: Number,
});

module.exports = mongoose.model("User", newSchema);
