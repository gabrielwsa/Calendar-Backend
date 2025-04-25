const { Schema, model } = require('mongoose');

const EventSchema = Schema({
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

//! Podemos agregar metodos a los schemas para formatar os datos que se devuelven
EventSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    //! agora o nome vai ser id renomeando direto no object
    object.id = _id;
    return object;
});

module.exports = model('Event', EventSchema);