//
// const express = require('express');
// const router = express.Router();
//
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://0.0.0.0:27017/thanksgivingUserDetailsDB');
//
// const userDetailsSchema = mongoose.Schema({
//     username: String,
//     name: String,
//     occupation: String,
//     hobbies: String
// });
//
// const UserDetails = mongoose.model('UserDetails', userDetailsSchema);
//
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//     console.log('Connected');
// });
//
//
// router.get('/get-user-details', function (req, res, next) {
//     console.log('Getting User Details');
//
//     UserDetails.find({ username: req.query.username }, function (err, user) {
//         if (err) return console.error(err);
//         else {
//             console.log(user);
//             res.json(user);
//         }
//     });
// });
//
//
//
//
// module.exports = router;
