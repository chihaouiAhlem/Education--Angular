///creation d un shema ou modele via mongoose
const { EmailValidator } = require("@angular/forms");
const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

///creation des attribut 
///je peux ajouter des validateurs
const eventSchema = mongoose.Schema({
    eventName: { type: String, required: true },
    eventDate: { type: String, required: true },
    eventDescription: { type: String, required: true },
    eventPlace: Number,
    eventPrice: Number,
    img: String,



});
////crier le modele user
eventSchema.plugin(uniqueValidator);

const event = mongoose.model('Event', eventSchema);
module.exports = event;