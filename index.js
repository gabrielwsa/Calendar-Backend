const express = require("express");
const dotenv = require("dotenv");

//* CREAR SERVIDOR EXPRESS
const app = express();

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