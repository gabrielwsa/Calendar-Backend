const { response } = require('express');
const { validationResult } = require('express-validator');
const User = require('../models/User');

const createUser = async (req, res = response) => {

    const { name, email, password } = req.body;

    try {
        const user = new User({ name, email, password });
        await user.save();

        res.status(200).json({
            "msg":"User created",
        });
    } catch (error) {
        res.status(400).json({
            "msg":"Error creating user",
        });
    }
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