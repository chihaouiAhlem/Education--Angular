 //importit module ml nodemodule "express"
 const express = require("express");
 /////conf bodyparser:importer 1
 const bodyParser = require('body-parser');
 //// import bcrypt module
 const bcrypt = require("bcrypt");
 ////mongoose
 const mongoose = require("mongoose");
 ////multer import
 const multer = require("multer");
 /////messagerie sms
 //const twilio = require('twilio');
 const axios = require("axios");
 //nodemailer
 const nodemailer = require("nodemailer");
 ///connexion avec mongoDB name  anonymousDB
 mongoose.connect('mongodb://localhost:27017/educDB');
 //importer les models
 const User = require("./models/user");
 const Event = require("./models/event");
 const Course = require("./models/course");
 //const user = require("./models/user");
 const Reservation = require("./models/reservation");
 const ReservationEvent = require("./models/reservation-event");
 ///crier une application BE
 const app = express();
 ////body parser configuration to send response to FE in format json 2
 app.use(bodyParser.json());
 ////body parser configuration to parse  receved object from BE
 app.use(bodyParser.urlencoded({ extended: true }));
 ////busniss logic ///traitement des req
 ///securité
 app.use((req, res, next) => {
     res.setHeader("Access-Control-Allow-Origin", "*");
     res.setHeader(
         "Access-Control-Allow-Headers",
         "Origin, X-Requested-With, Content-Type, Accept, Authorization"
     );
     res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS, PATCH, PUT");
     next();
 });

 ////Multer 
 const path = require("path");
 const { ColdObservable } = require("rxjs/internal/testing/ColdObservable");
 const reservation = require("./models/reservation");
 ///shotcard
 ///multer config 
 app.use('/images', express.static(path.join('backend/images/courses')));
 const MIME_TYPE = {
     "image/png": "png",
     "image/jpeg": "jpg",
     "image/jpg": "jpg",
 };

 const storage = multer.diskStorage({
     // destination
     destination: (req, file, cb) => {
         const isValid = MIME_TYPE[file.mimetype];
         let error = new Error("Mime type is invalid");
         if (isValid) {
             error = null;
         }
         cb(null, "backend/images/courses");
     },
     filename: (req, file, cb) => {
         const name = file.originalname.toLowerCase().split(' ').join('-'); //kol espace tbadl-
         const extension = MIME_TYPE[file.mimetype];
         const imgName = name + '-' + Date.now() + '-Ahlem-' + '.' +
             extension;
         cb(null, imgName);
     }
 });
 ////
 //////
 app.post("/users/sms", function(req, res) {
     const accountSid = 'AC3d5238521233d5ec7b6fbaada12b34ff'; // Your Account SID from www.twilio.com/console
     const authToken = 'f8b09518224049c83cdc35f699c709c2'; // Your Auth Token from www.twilio.com/console


     var twilio = require("twilio");
     var client = new twilio(accountSid, authToken);

     client.messages
         .create({
             body: req.body.message + 'message de:' + '' + req.body.name,
             to: '+21621205053', // Text this number
             from: '+19203153121', // From a valid Twilio number
         })
         .then((message) => res.send(`The message with id: ${message} was sent!`));
 });
 /////get courses by id
 app.get("/courses/:id", (req, res) => {
     //      //instruction
     // console.log('here abderrahmen courses');
     let x = req.params.id; //recuperer le param nomme id from path
     //console.log('hrere my path');
     //search match by id
     console.log('hrere id from path', x);
     ///methode o5ra mta3reponse
     Course.findOne({ _id: x }).then((doc) => {
         //          //console.log('error', err);
         console.log("here doc", doc);
         res.json({ pp: doc })

     });
 });
 ////add course

 app.post('/courses', multer({ storage: storage }).single("img"), (req, res) => {
     console.log("req.tets idProf", req.body);
     let url = req.protocol + '://' + req.get('host'); //concationation http://urldebaseduserveur BE
     let course = new Course({
         coursName: req.body.coursName,
         nbrHours: req.body.nbrHours,
         coursPlaces: req.body.coursPlaces,
         coursPrice: req.body.coursPrice,
         coursInfo: req.body.coursInfo, //t
         coursDate: req.body.coursDate, //t
         idProf: req.body.idProf,
         img: url + '/images/' + req.file.filename
     });
     course.save((err, doc) => {
         //console.log('here erro', err);
         //console.log('here document', doc);
         if (err) {
             console.log('error with Db,', err);
         } else {
             res.json({
                 message: "course added with succees"
             });

         }
     }); ///fct mongoose bech tsajjlou 
     // console.log("here match obj", x);
     // allMatches.push(x);

 });

 ///get all courses
 app.get('/courses', (req, res) => {
     Course.find((err, docs) => {
         if (err) {
             console.log("error BD", err);
         } else {
             res.json({ courses: docs, title: "display Courses" });

         }
         ///interdit bech n3ayety lil doc lbarra 
         console.log("here docs", docs);
     });

 });
 /////getallcourses of prof/// Event.findOne({ _id: x })
 app.get('/courses/find/:idProf', (req, res) => {
     let idProf = req.params.idProf;
     console.log("here prof", idProf);

     Course.find({ idProf: idProf }).exec(function(err, docs) {
         if (err) {
             console.log("error BD", err);
         } else {

             res.json({ courses: docs, title: "display Courses" });

         }
         ///interdit bech n3ayety lil doc lbarra 
     });

 });
 ////
 app.delete("/courses/:id", (req, res) => {
     //instruction
     let x = req.params.id; //recuperer le param nomme id from path
     console.log("here into delete", x)
         //console.log('hrere my path');

     Course.deleteOne({ _id: x }).then((response) => {
         //console.log('error', err);
         console.log("here response", response);
         if (response.deletedCount == 1) { ///deletedCount attribut fil messge ml base
             res.json({ pp: "deleted with success" });

         }

     });
     ///

 });

 app.put('/courses/:id', (req, res) => {
     Course.updateOne({ _id: req.params.id }, req.body).then((response) => {
         console.log("here response after update", response);
         if (response.modifiedCount == 1) {
             res.json({ pp: "edited with success" });
         }
     });

 });
 ////search courses when price between min and max
 app.post('/courses/search', (req, res) => {
     //console.log('here into search');
     //console.log('here search obj', req.body);
     //find({ coursPrice: { $lte: 100 }, coursPrice: { $gte: 60000 } })
     Course.find({ coursPrice: { $gt: req.body.priceMin, $lt: req.body.priceMax } }).then((doc) => {
         //console.log('error', err);
         // console.log("here doc", doc);
         res.json({ course: doc });

     });
 });
 ///.ts:import from
 app.get("/events/:id", (req, res) => {
     //instruction
     let x = req.params.id; //recuperer le param nomme id from path
     //console.log('hrere my path');
     console.log('hrere id from path', x);
     ///methode o5ra mta3reponse
     Event.findOne({ _id: x }).then((doc) => {
         //console.log('error', err);
         console.log("here doc", doc);
         res.json({ pp: doc });

     });
 });
 ////add course

 app.post('/events', multer({ storage: storage }).single('img'), (req, res) => {
     let url = req.protocol + '://' + req.get('host'); //concationation http://urldebaseduserveur BE
     let event = new Event({
         eventName: req.body.eventName,
         eventDate: req.body.eventDate,
         eventDescription: req.body.eventDescription,
         eventPlace: req.body.eventPlace,
         eventPrice: req.body.eventPrice,
         img: url + '/images/' + req.file.filename,
     });
     event.save((err, doc) => {
         //console.log('here erro', err);
         //console.log('here document', doc);
         if (err) {
             console.log('error with Db,', err);
         } else {
             res.json({
                 message: "event added with succees"
             });

         }
     }); ///fct mongoose bech tsajjlou 

 });

 ///get all events
 app.get('/events', (req, res) => {
     Event.find((err, docs) => {
         if (err) {
             console.log("error BD", err);
         } else {
             res.json({ events: docs, title: "display Events" });

         }
         ///interdit bech n3ayety lil doc lbarra 
         console.log("here docs", docs);
     });

 });
 ////
 app.delete("/events/:id", (req, res) => {
     //instruction
     let x = req.params.id; //recuperer le param nomme id from path
     console.log("here into delete", x)
         //console.log('hrere my path');

     Event.deleteOne({ _id: x }).then((response) => {
         //console.log('error', err);
         console.log("here response", response);
         if (response.deletedCount == 1) { ///deletedCount attribut fil messge ml base
             res.json({ pp: "deleted with success" });

         }

     });
 });

 app.put('/events/:id', (req, res) => {
     Event.updateOne({ _id: req.params.id }, req.body).then((response) => {
         console.log("here response after update", response);
         if (response.modifiedCount == 1) {
             res.json({ pp: "edited with success" });
         }
     });

 });
 ////search eents wdete between two value
 app.post('/events/search/b/c/d', (req, res) => {
     //console.log('here into search');
     //console.log('here search obj', req.body);
     //find({ coursPrice: { $lte: 100 }, coursPrice: { $gte: 60000 } })
     Event.find({ eventDate: { $gt: req.body.dateMins, $lt: req.body.dateMaxs } }).then((doc) => {
         //console.log('error', err);
         // console.log("here doc", doc);
         res.json({ events: doc });
     });
 });
 ///tutors
 app.get('/users/tutors', (req, res) => {
     User.find({ role: 'tutor', status: "ok" }).then((doc) => {
         //console.log('error', err);
         console.log("here doc", doc);
         res.json({ users: doc })

     });
     //res.json({ users: pp, message: "here teachers,done" });
 });

 ////nodemailer

 function dispatch_emails(admin_email, user_email, fullname, pwd, cin) {
     var admin_email = "chihaoui.ahlem@gmail.com";
     const transporter = nodemailer.createTransport({
         service: 'gmail',
         host: 'smtp.gmail.com',
         port: '587',
         auth: {
             user: 'chihaoui.ahlem@gmail.com', //mon mail
             pass: 'guuztrocdxjuoejq'
         },
         secureConnection: 'false',
         tls: {
             ciphers: 'SSLv3',
             rejectUnauthorized: false
         }
     });
     const mailOptions = {
         from: 'chihaoui.ahlem@gmail.com',
         to: user_email,
         subject: 'Account Registration Successful!',
         html: '<h3>Bienvenue,' + fullname + ' , </h3><p><h3>Your Account has been successfully setup.</h3></p><p> Please allow a maximum of 24 - 48 Hours for Review and succesful setup and approval of your online account.</p></br>Regards,</br><p class="text-danger"> . your password: ' + '' + pwd + ' your login:' + '' + cin + '</p>',
     };
     const AdminNotifyEmail = {
         from: 'chihaoui.ahlem@gmail.com',
         to: admin_email,
         subject: 'Account Registration for ' + user_email + ', with Fullname : ' + fullname + '',
         html: '<h3>Attention Admin , </h3><p>A new User has registered his Access with the following Information: </br> <strong>Username : ' + user_email + '</strong></br><strong>Company Name :  </strong></br><strong>Date of Registration : ' + Date.Now + '</strong></p>'
     };


     transporter.sendMail(mailOptions, function(error, info) {
         if (error) throw error;
         return res.send({ error: false, data: info, message: 'OK' });
     })
     transporter.sendMail(AdminNotifyEmail, function(error, info) {
         if (error) throw error;
         return res.send({ error: false, data: info, message: 'OK' });
     })
 }
 app.post("/users/signUp", multer({ storage: storage }).single('img'), (req, res) => {
     console.log('req:', req.body);

     bcrypt.hash(req.body.password, 10).then(

         (cryptedPwd) => {
             let url = req.protocol + '://' + req.get('host'); //concationation http://urldebaseduserveur BE
             let user = new User({
                 firstName: req.body.firstName,
                 lastName: req.body.lastName,
                 email: req.body.email,
                 pwd: cryptedPwd,
                 gender: req.body.gender,
                 cin: req.body.cin,
                 tel: req.body.tel,
                 speciality: req.body.speciality,
                 adresse: req.body.adress,
                 role: req.body.role,
                 status: req.body.status,
                 img: url + '/images/' + req.file.filename,

             });

             let admin_email = "chihaoui.ahlem@gmail.com";

             user.save(function(err, user) {
                 if (err) {
                     return res.status(400).send({
                         message: err
                     });
                 } else {
                     ///nodemailer
                     dispatch_emails(admin_email, user.email, user.firstName, req.body.password, user.cin);
                     return res.json({
                         message: "1",
                         user: user
                     });
                 }
             })

         });
 });

 ///login :search user by email and  pwd

 app.post("/users/login", (req, res) => {
     // log("here user", req.body);
     User.findOne({ cin: req.body.cin }).then((doc) => {
         console.log("here doc", doc);
         if (!doc) {
             res.json({ message: "0" });
         }
         ///compare req.body.pwd with doc.pwd
         ///bcrypt pour le cryptage
         return bcrypt.compare(req.body.password, doc.pwd);
     }).then((pwdResult) => {
         console.log("pwdResult", pwdResult);
         if (!pwdResult) {
             res.json({ message: "1" });
         }
         ////if user exist w motpasse s7i7 m
         //if (user && pwdResult) {
         User.findOne({ cin: req.body.cin }).then(
                 (finalResult) => {
                     let userToSend = {
                         firstName: finalResult.firstName,
                         lastName: finalResult.lastName,
                         role: finalResult.role,
                         password: req.body.password,
                         _id: finalResult._id,
                         status: finalResult.status,
                         cin: finalResult.cin,
                         img: finalResult.img,

                     };
                     // console.log("here user to send", userToSend)
                     res.json({
                         message: "2",
                         user: userToSend
                     });
                 }
             )
             // }
             ////kol chay s7i7  nab3athou lil DB najmch bl doc 5ater 5rajt

     });

 });
 ////get user by id
 app.get("/users/:id", (req, res) => {
     //instruction
     let x = req.params.id; //recuperer le param nomme id from path
     //console.log('hrere my path');
     //search match by id
     console.log('hrere id from path', x);
     ///methode o5ra mta3reponse
     User.findOne({ _id: x }).then((doc) => {
         //console.log('error', err);
         console.log("here doc", doc);
         res.json({ pp: doc })

     });
 });
 //
 ///get all users
 app.get('/users', (req, res) => {
     User.find().sort({ role: -1 }).exec(function(err, docs) {
         if (err) {
             console.log("error BD", err);
         } else {

             res.json({ users: docs, title: "display Users" });

         }
         ///interdit bech n3ayety lil doc lbarra 
         console.log("here docs", docs);
     });

 });
 ////
 app.delete("/users/:id", (req, res) => {
     //instruction
     let x = req.params.id; //recuperer le param nomme id from path
     console.log("here into delete", x)
         //console.log('hrere my path');

     User.deleteOne({ _id: x }).then((response) => {
         //console.log('error', err);
         console.log("here response", response);
         if (response.deletedCount == 1) { ///deletedCount attribut fil messge ml base
             res.json({ pp: "deleted with success" });

         }

     });
     ///

 });
 ////edit user
 app.put('/users/:id', (req, res) => {
     User.updateOne({ _id: req.params.id }, req.body).then((response) => {
         console.log("here response after update", response);
         if (response.modifiedCount == 1) {
             res.json({ pp: "edited with success" });
         }
     });

 });

 ////put password
 app.put('/users/pass/:id', (req, res) => {
     ///({name:"Bhannu"},{$set:{pwd:req.body.password}})
     // let x = bcrypt.hash(req.body.newPass);
     bcrypt.hash(req.body.newPass, 10).then(
         (cryptedPwd) => {
             console.log("crtyuiop", cryptedPwd);
             User.updateOne({ _id: req.params.id }, { $set: { pwd: cryptedPwd } }).then((response) => {
                 console.log("here response after update pwd = req.body.password", req.body.newPass);
                 if (response.modifiedCount == 1) {
                     res.json({ pp: "edited with success" });
                 }
             });
         }
     )


 });

 ///////////////////////Reservations add
 app.post('/courses/reservation', (req, res) => {

     let reservation = new Reservation({
         idCourse: req.body.idCourse,
         userId: req.body.userId,
         reserve: "ok"
     });
     reservation.save((err, doc) => {
         //console.log('here erro', err);
         //console.log('here document', doc);
         if (err) {

             console.log('error with Db,', err);
         } else {

             res.json({
                 message: "registered with success"
             });

         }
     }); ///fct mongoose bech tsajjlou 

 });
 ///////mise a jour des places apres la reservation
 //{ $set: { coursPlaces }, $inc: { quantity: 2 } }
 app.put('/courses/places/:id', (req, res) => {
     console.log("here body", req.body);
     Course.updateOne({ _id: req.body.idCourse }, { $inc: { coursPlaces: -1 } }).then((response) => {
         console.log("here response after update", response);
         if (response.modifiedCount == 1) {
             res.json({ pp: "edited with success" });
         }
     });

 });

 //////////reservation unique
 app.get("/courses/:idUser/:idCours", (req, res) => {
     //instruction
     let idUser = req.params.idUser; //recuperer le param nomme id from path
     let idCours = req.params.idCours; //recuperer le param nomme id from path
     console.log('idUser', idUser);
     console.log('idCours', idUser);
     //console.log('hrere my path');
     //search match by id
     // console.log('hrere id user from path', idUser, idCours);
     ///methode o5ra mta3reponse
     //  db.collection.find( { a: 5, b: 5 } ).count()
     Reservation.find({ idCourse: req.params.idCours, userId: req.params.idUser }).count()
         .exec(function(err, docs) {
             console.log('hrere docs res', docs);

             if (err) {
                 console.log("err!...", err);
             } else {

                 res.json({ message: docs });

             }
             ///interdit bech n3ayety lil doc lbarra 
             // console.log("here docs", docs);
         });


 });
 /////////////////getreservation
 app.get('/courses/:idUser/reserv/a', (req, res) => {
     let id = req.params.idUser;

     Reservation.find({ userId: id }).exec(function(err, docs) {
         if (err) {
             console.log("error BD", err);
         }
         ////
         let tab = [];
         for (let i = 0; i < docs.length; i++) {
             tab.push(docs[i].idCourse);
         }

         Course.find({ _id: { $in: tab } }).exec(function(err, docss) {
             console.log('hrere docs res', docss);

             if (err) {
                 console.log("err!...", err);
             }

             res.json({ courses: docss })


             ///interdit bech n3ayety lil doc lbarra 
         });

     });
 });
 ///afficher les students dans un cours
 app.get('/courses/:idCourse/reserv/a/b', (req, res) => {
     let id = req.params.idCourse;

     Reservation.find({ idCourse: id }).exec(function(err, docs) {
         if (err) {
             console.log("error BD", err);
         }
         ////
         let tab = [];
         for (let i = 0; i < docs.length; i++) {
             tab.push(docs[i].userId);
         }
         // console.log("tab", tab);

         ////

         /// var ids = docs;
         //console.log("docs tab", ids);

         //var obj_ids = ids.map(function(id) { return (id); });
         User.find({ _id: { $in: tab } }).exec(function(err, docss) {
             console.log('hrere docs res', docss);

             if (err) {
                 console.log("err!...", err);
             }

             res.json({ students: docss })


             ///interdit bech n3ayety lil doc lbarra 
         });

     });
 });
 ////////////////////events reservations**************************************
 ///////////////////////Reservations add
 app.post('/events/reservation', (req, res) => {

     let reservation = new ReservationEvent({
         idEvent: req.body.idEvent,
         userId: req.body.userId,
         reserve: "ok"
     });
     reservation.save((err, doc) => {
         //console.log('here erro', err);
         //console.log('here document', doc);
         if (err) {

             console.log('error with Db,', err);
         } else {

             res.json({
                 message: "registered with success"
             });

         }
     }); ///fct mongoose bech tsajjlou 

 });
 ///////mise a jour des places apres la reservation
 //{ $set: { coursPlaces }, $inc: { quantity: 2 } }
 app.put('/events/places/:id', (req, res) => {
     console.log("here body", req.body);
     Event.updateOne({ _id: req.body.idEvent }, { $inc: { eventPlace: -1 } }).then((response) => {
         console.log("here response after update", response);
         if (response.modifiedCount == 1) {
             res.json({ pp: "edited with success" });
         }
     });

 });

 //////////reservation unique
 app.get("/events/:idUser/:idEvent", (req, res) => {
     //instruction
     let idUser = req.params.idUser; //recuperer le param nomme id from path
     let idEvent = req.params.idEvent; //recuperer le param nomme id from path
     //console.log('hrere my path');

     ReservationEvent.find({ idEvent: req.params.idEvent, userId: req.params.idUser }).count()
         .exec(function(err, docs) {
             console.log('hrere docs res', docs);

             if (err) {
                 console.log("err!...", err);
             } else {

                 res.json({ message: docs });

             }
             ///interdit bech n3ayety lil doc lbarra 
             // console.log("here docs", docs);
         });

 });
 //////
 app.put('/events/places/:id', (req, res) => {
     console.log("here body", req.body);
     Event.updateOne({ _id: req.body.idEvent }, { $inc: { eventPlace: -1 } }).then((response) => {
         console.log("here response after update", response);
         if (response.modifiedCount == 1) {
             res.json({ pp: "edited with success" });
         }
     });

 });
 ////////// reservation events for me(student)
 app.get('/events/:idUser/reserv/a', (req, res) => {
     let id = req.params.idUser;

     ReservationEvent.find({ userId: id }).exec(function(err, docs) {
         if (err) {
             console.log("error BD", err);
         }
         ////
         let tab = [];
         for (let i = 0; i < docs.length; i++) {
             tab.push(docs[i].idEvent);
         }

         Event.find({ _id: { $in: tab } }).exec(function(err, docss) {
             console.log('hrere docs res', docss);

             if (err) {
                 console.log("err!...", err);
             }
             res.json({ events: docss })
         });

     });
 });
 ////////
 /////api   search ville :tunis par exemple
 app.post('/wathers', (req, res) => {
     console.log('here into search', req.body);
     const country = req.body.ville;
     const apiKey = "62ee756a34835483299877a61961cafb";

     const apiUrl =
         "https://api.openweathermap.org/data/2.5/weather?q=" +
         country +
         "&appid=" +
         apiKey + "&units=metric";
     ///axios intermediate between serveur BE and API
     axios.get(apiUrl).then((response) => {
         //console.log('Here response', response.data.weather[0].icon);
         const resultWeatherData = {
             pressue: response.data.main.pressure,
             //  humidity: response.data.main.humidity,
             temp: response.data.main.temp,
             // image: response.data.weather[0].icon,
             // country: response.data.name,
             // wind: response.data.wind.speed ////ri7
         }

         const weather = response.data.main;
         //  console.log('Here weather main', weather);
         const result = {
             temp: weather.temp,
             pressure: weather.pressure,
             humidity: weather.humidity,
             image: response.data.weather[0].icon,
             country: response.data.name,
             wind: response.data.wind.speed ////ri7
         }
         res.json({
             result: result
         })
     });
 });

 module.exports = app; ///rendre app importable:st7a99ineh fi sever .js