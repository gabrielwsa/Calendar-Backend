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

const updateEvent = async(req, res = response) => {
    
    const eventId = req.params.id;

    try{
        const event = await Event.findById(eventId);

        if(!event){
            return res.status(404).json({
                ok: false,
                msg: 'event not found'
            });
        }

        if(event.user.toString() !== req.uid){
            return res.status(401).json({
                ok: false,
                msg: 'You are not allowed to edit this event'
            });
        }

        const newEvent = {
            ...req.body,
            user: req.uid
        }

        const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent);
        
        
        
        
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

const deleteEvent = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'deleteEvent'
    });
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}