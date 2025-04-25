const { response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req, res = response, next) => {

    //* x-token headers
    const token = req.header('x-token');
    if(!token) return res.status(401).json({ msg: 'No token provided' });

    try {
        const payload = jwt.verify(token, process.env.SECRET_JWT_SEED);
        req.uid = payload.uid;
        req.name = payload.name;
        console.log(payload);
    
    } catch (error) {
        return res.status(401).json({ msg: 'Invalid token' });
    }

    next();
}

module.exports = {
    validateJWT
};