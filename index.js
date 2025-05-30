const express = require("express");
const dotenv = require("dotenv");
const { dbConnection } = require("./database/config");
const cors = require('cors');
const path = require('path');

dotenv.config();

//* CREAR SERVIDOR EXPRESS
const app = express();

//* Conectar a la base de datos
dbConnection();

//* CORS - configuracao basica seria somente agregar ele a todas as rotas
app.use(cors());

//* ROUTE PUBLIC
app.use(express.static("public"));

//* parsear body
app.use(express.json());

//* ROUTER
//* auth: criar, login, renew (Endpoint: /auth)
app.use('/api/auth', require('./routes/auth'));

//* crud: eventos
app.use('/api/events', require('./routes/events'));

//* ROUTE PUBLIC
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
})

app.listen(process.env.PORT, () => {
    console.log(`App running on port ${process.env.PORT}`);
})