///creation d un shema ou modele via mongoose
const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

///creation des attribut 
///je peux ajouter des validateurs
const userSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true },
    pwd: { type: String, required: true },
    gender: { type: String, required: true },
    cin: { type: Number, unique: true, required: true },
    tel: { type: Number, required: true },
    speciality: String,
    adresse: String,
    img: String,

    role: String,
    status: String //S bl kbir mouch kima ts
        // isActive: { type: Boolean, default: false },
        // activationCode: String
});
////crier le modele user
userSchema.plugin(uniqueValidator);

const user = mongoose.model('User', userSchema);
module.exports = user;