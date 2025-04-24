/*
    Routes de usuarios /auth
    host + /api/auth
    router.post('/new', [middleware], createUser);
*/


const { Router } = require("express");
const { check } = require('express-validator');
const router = Router();
const { createUser, loginUser, renewToken } = require('../controllers/auth');

//* Crear usuario
router.post('/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }),
], createUser);

//* Login usuario
router.post('/', loginUser);

//* Renew token
router.get('/renew', renewToken);

module.exports = router;