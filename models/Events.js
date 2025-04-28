const { Schema, model } = require('mongoose');

/**
 * Schema do MongoDB para eventos do calendário
 * Define a estrutura dos eventos, incluindo o campo de notas e a relação com usuários
 * O campo user é essencial para o mecanismo de bloqueio de edição por outros usuários
 */
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
    // Campo para armazenar as notas do evento
    // Este é o campo que é protegido pelo mecanismo de bloqueio de edição
    notes: {
        type: String,
    },
    // Referência ao usuário que criou o evento
    // Esta referência é usada para verificar permissões de edição
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