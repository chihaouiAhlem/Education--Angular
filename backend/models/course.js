///creation d un shema ou modele via mongoose
const { EmailValidator } = require("@angular/forms");
const mongoose = require("mongoose");
///creation des attribut 
///je peux ajouter des validateurs
const courseSchema = mongoose.Schema({
    coursName: String,
    nbrHours: Number,
    coursPlaces: Number,
    coursPrice: Number,
    coursDate: String,
    coursInfo: String,
    idProf: mongoose.Schema.Types.ObjectId,
    // idProf: String,
    img: String

});
////crier le modele user
const course = mongoose.model('Course', courseSchema);
module.exports = course;