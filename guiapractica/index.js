// Importar todas las librerías necesarias.
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const low = require("lowdb");
const articulosRouter = require("../routes/articulos.js")


// Determinamos el puerto del EndPoint
const PORT = process.env.PORT || 10801;

//obtenemos la libreria controlaor de archivo
const FileSync = require("lowdb/adapters/FileSync");

// Creamos el archivo db.json
const adapter = new FileSync("db.json");
const db = low(adapter);

// Inicializamos la BD
db.defaults({ articulos: [] }).write();

// Creamos el aplicativo
const app = express();

// Definimos el DB
app.db = db;

// Definimos las variables necesarias.
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Mostramos el log de ejecución del servidor
app.listen(PORT, () => console.log(`El servidor está corriendo en el puerto ${PORT}`)); // Corregido: se agregó el signo '$' para la interpolación

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "librerias APIs - CERTUS",
            version: "1.0.0",
            description: "Demo de librerias de venta API",
        },
        servers: [
            {
                url: "http://localhost" + PORT,
            },
        ],
    },
    apis: ["./routes/*.js"],
}

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/articulos", articulosRouter)