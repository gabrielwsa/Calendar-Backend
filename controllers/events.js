const { response } = require("express");
const Event = require("../models/Events");

const getEvents = async(req, res = response) => {

    //! Podemos usar populate para exibir o nome do usuário que criou o evento
    //! igual a with de laravel
    //! ou como se fosse o join de sql
    const events = await Event.find().populate('user', 'name');

    res.json({
        ok: true,
        events
    });
}

const createEvent = async (req, res = response) => {

    const events = new Event(req.body);

    try{
        events.user = req.uid;
        await events.save();

        return res.status(201).json({
            ok: true,
            event: events
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al crear el evento'
        });
    }
}

/**
 * Função responsável por atualizar um evento (incluindo suas notas)
 * Implementa o mecanismo de bloqueio que impede que um usuário edite eventos de outro usuário
 * @param {object} req - Objeto de requisição contendo os dados da requisição HTTP
 * @param {object} res - Objeto de resposta para retornar ao cliente
 */
const updateEvent = async(req, res = response) => {
    
    // Obtém o ID do evento que será atualizado a partir dos parâmetros da URL
    const eventId = req.params.id;

    try{
        // Busca o evento no banco de dados pelo ID
        const event = await Event.findById(eventId);

        // Verifica se o evento existe
        if(!event){
            return res.status(404).json({
                ok: false,
                msg: 'event not found'
            });
        }

        // MECANISMO DE BLOQUEIO: Verifica se o usuário autenticado é o proprietário do evento
        // Compara o ID do usuário armazenado no evento com o ID do usuário atual (obtido do token JWT)
        // Esta é a parte principal que impede que outros usuários editem notas/eventos que não criaram
        if(event.user.toString() !== req.uid){
            return res.status(401).json({
                ok: false,
                msg: 'You are not allowed to edit this event'
            });
        }

        // Se passou pela verificação, o usuário tem permissão para editar
        // Cria um novo objeto com os dados atualizados, mantendo o ID do usuário original
        const newEvent = {
            ...req.body,
            user: req.uid
        }

        // Atualiza o evento no banco de dados
        //* o parametro new: true para que retorne el evento actualizado
        const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, {new: true});
        
        
    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al actualizar el evento'
        });
    }

    res.json({
        ok: true,
        msg: 'updateEvent'
    });
}

/**
 * Função para excluir um evento
 * Também implementa verificação de propriedade similar ao updateEvent
 */
const deleteEvent = async(req, res = response) => {
    
    const eventId = req.params.id;

    try{
        const event = await Event.findById(eventId);

        if(!event) return res.status(404).json({ ok: false, msg: 'event not found' });

        // Similar ao updateEvent, verifica se o usuário tem permissão para excluir o evento
        if(event.user.toString() !== req.uid) return res.status(401).json({ ok: false, msg: 'You are not allowed to delete this event' });

        await Event.findByIdAndDelete(eventId);

        return res.json({
            ok: true,
            msg: 'Event deleted'
        });
        
    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al eliminar el evento'
        });
    }

}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}