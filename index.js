const express = require("express");
const dotenv = require("dotenv");
const { dbConnection } = require("./database/config");
dotenv.config();

//* CREAR SERVIDOR EXPRESS
const app = express();

//* Conectar a la base de datos
dbConnection();

//* ROUTE PUBLIC
app.use(express.static("public"));
//* parsear body
app.use(express.json());

//* ROUTER
//* auth: criar, login, renew (Endpoint: /auth)
app.use('/api/auth', require('./routes/auth'));
//* crud: eventos


app.listen(5890, () => {
    console.log(`App running on port ${5890}`);
})