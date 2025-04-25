const { response } = require('express');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) => {

    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ "msg":"User already exists with this email" });

        user = new User({ 
            name, 
            email, 
            password: bcrypt.hashSync(password, 10) 
        });
        await user.save();

        res.status(200).json({
            ok: true,
            uid: user.id,
            name: user.name,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "unexpect error, contact support",
        });
    }
}

const loginUser = async (req, res = response) => {

    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ "msg":"User does not exist with this email" });

        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) return res.status(400).json({ "msg":"Invalid password" });

        const token = await generateJWT(user.id, user.name);

        res.status(200).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "unexpect error, contact support",
        });
    }
}

const renewToken = async (req, res = response) => {

    const { uid, name } = req;
    const token = await generateJWT(uid, name);

    res.status(200).json({
        ok: true,
        token
    });
}

module.exports = {
    // createUser: createUser, // o mesmo que passar apenas o nome da funcao, ja que o nome da funcao é o mesmo nome exportado
    createUser,
    loginUser,
    renewToken
}