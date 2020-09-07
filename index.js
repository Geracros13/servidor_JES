const express = require("express"); //Framework de servidor
const mongoose = require("mongoose"); //Modulo de conexion a la BD de mongo
const cors = require("cors");

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
//Importar variables de entorno
require("dotenv").config({ path: "variables.env" });

//Sirve para conectarse a la BD
mongoose.connect(process.env.DB_URL, {
  //Asignamos la variable de entorno de la DB
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(express.json()); // Decirle a express que pueda entender los formatos json
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", require("./routes/index"));

//Swagger
//Inicio de la documentacion, puedo consultar la sintaxis aqui [https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#serverObject]
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Backend para el Proyecto de Fiscalias",
      description: "CRUD de proyecto de JES",
      servers: ["https://polar-mountain-90943.herokuapp.com/api"],
    },
  },
  apis: ["./routes/index.js"], //Aqui defino en donde estan la api, por ejemplo las rutas
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/documentacion", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

//Swagger

// Leer localhost de variables y puerto
const host = process.env.HOST || "0.0.0.0";

const port = process.env.PORT || 80;

// Vincula y escucha conexiones en el host y puerto especificados
app.listen(port, host, () => {
  //Esto nos servira en HEroku para saber que todo va ok
  console.log("El servidor esta funcionanco perfectamente!");
});
