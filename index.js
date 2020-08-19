const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//Importar variables de entorno
require("dotenv").config({ path: "variables.env" });

//Asignamos la variable de entorno de la DB
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", require("./routes/index"));

// Leer localhost de variables y puerto
const host = process.env.HOST || "0.0.0.0";

const port = process.env.PORT || 80;

app.listen(port, host, () => {
  //Esto nos servira en HEroku para saber que todo va ok
  console.log("El servidor esta funcionanco perfectamente!");
});
