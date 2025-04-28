const { Router } = require("express");
const { check } = require("express-validator");
const { validateJWT } = require("../middlewares/validar-jwt");
const { validarCampos } = require("../middlewares/validar-campos");
const { isDate } = require("../helpers/isDate");
const { getEvents, createEvent, updateEvent, deleteEvent } = require("../controllers/events");
const router = Router();

//! PODEMOS FAZER COM QUE TODAS AS PETICOES PASSAMOS PELO MIDDLEWARE DE VALIDACAO DO JWT
//! router.use(validateJWT);

//* Get events
router.get('/',[validateJWT], getEvents);

//* Create event
router.post('/',[
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('notes', 'Las notas son obligatorias').optional(),
    check('start', 'La fecha de inicio es obligatoria').custom(isDate),
    check('end', 'La fecha de fin es obligatoria').custom(isDate),
    validarCampos,
    validateJWT
], createEvent);

/**
 * Rota de atualização de eventos (incluindo notas)
 * O middleware validateJWT garante que apenas usuários autenticados acessem esta rota
 * Dentro do controlador updateEvent existe a verificação que bloqueia edição por outros usuários
 * Esta é a rota chamada quando um usuário tenta editar notas de um evento
 */
router.put('/:id',[validateJWT], updateEvent);

/**
 * Rota para excluir eventos
 * Similar à rota de atualização, também verifica propriedade do evento no controlador
 */
router.delete('/:id',[validateJWT], deleteEvent);

module.exports = router;