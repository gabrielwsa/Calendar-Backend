const { response } = require('express');
const { validationResult } = require('express-validator');

const createUser = (req, res = response) => {

    res.status(200).json({
       "msg":"Peticao recebida",
       "body": req.body
    });
}

const loginUser = (req, res) => {
    res.json({
        message: "Login user",
        status: 200
    });
}

const renewToken = (req, res) => {
    res.json({
        message: "Renew token",
        status: 200
    });
}

module.exports = {
    // createUser: createUser, // o mesmo que passar apenas o nome da funcao, ja que o nome da funcao é o mesmo nome exportado
    createUser,
    loginUser,
    renewToken
}