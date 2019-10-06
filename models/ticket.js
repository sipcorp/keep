const mongoose = require('mongoose');
const { Schema } = mongoose;

const TicketSchema = mongoose.Schema({
    ticketNum: { type: String, require: true },
    typeService:{ type: String, require: true },
    name: { type: String, require: true },
    email: { type: String, require: true },
    phone: { type: String, require: true },
    subject: { type: String, require: true },
    message: { type: String, require: true },
    status: { type: String, require: true },
    owner: { type: String, require: true },
    comments:{type:Array,require:false},
    lastUpdate: { type: Date, require: true }
}, { collection: 'ticket' })

module.exports = mongoose.model('ticket', TicketSchema);