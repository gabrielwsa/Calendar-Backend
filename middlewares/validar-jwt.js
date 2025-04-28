const { response } = require('express');
const jwt = require('jsonwebtoken');

/**
 * Middleware responsável pela validação do token JWT
 * Parte essencial do mecanismo de proteção que impede edição não autorizada
 * Extrai e valida o ID do usuário do token, que será usado para verificar permissões
 */
const validateJWT = (req, res = response, next) => {

    //* x-token headers
    // Obtém o token do cabeçalho da requisição
    const token = req.header('x-token');
    if(!token) return res.status(401).json({ msg: 'No token provided' });

    try {
        // Verifica e decodifica o token JWT usando a chave secreta
        const payload = jwt.verify(token, process.env.SECRET_JWT_SEED);
        
        // Adiciona o ID (uid) e nome do usuário ao objeto de requisição
        // Este uid será usado posteriormente para verificar a propriedade dos eventos
        req.uid = payload.uid;
        req.name = payload.name;
        console.log(payload);
    
    } catch (error) {
        return res.status(401).json({ msg: 'Invalid token' });
    }

    // Passa para o próximo middleware ou controlador
    next();
}

module.exports = {
    validateJWT
};