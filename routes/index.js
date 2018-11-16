
const express = require('express');
const router = express.Router();

/* Set up mongoose in order to connect to mongo database */
const mongoose = require('mongoose'); //Adds mongoose as a usable dependency

mongoose.connect('mongodb://0.0.0.0:27017/thanksgivingUsersDB'); //Connects to a mongo database

const usersSchema = mongoose.Schema({ //Defines the Schema for this database
    username: String,
    password: String,
    gender: String
});

const User = mongoose.model('User', usersSchema); //Makes an object from that schema as a model

const db = mongoose.connection; // Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
    console.log('Connected');
});

router.get('/get-user', function (req, res, next) {
    console.log('Getting Users');

    // let pwd = peq.query.pkey;

    User.find({ username: req.query.username, password: req.query.pkey }, function (err, user) {
        if (err) return console.error(err); //If there's an error, print it out
        else {
            console.log(user);
            res.json(user);
        }
    });
});

router.get('/get-users', function (req, res, next) {
    console.log('Getting Users');

    User.find(function (err, users) {
        if (err) return console.error(err); //If there's an error, print it out
        else {
            console.log(users);
            res.json(users);
        }
    });
});

router.post('/register', function (req, res, next) {
    console.log('Registering user');

    let newUser = new User(req.body);
    console.log(newUser);

    newUser.save(function (err, post) {
        if (err) return console.error(err);
        console.log(post);
        res.sendStatus(200);
    })
    // res.sendStatus(200);
});



let highScores = {};

router.get('/get-high-scores', function (req, res, next) {
    console.log('Getting high scores');

    let username = req.query.username;
    res.json(highScores[username]);
});



mongoose.connect('mongodb://0.0.0.0:27017/thanksgivingUserDetailsDB');

const userDetailsSchema = mongoose.Schema({
    username: String,
    name: String,
    occupation: String,
    hobbies: String,
    pic: String
});

const UserDetails = mongoose.model('UserDetails', userDetailsSchema);

const db2 = mongoose.connection;
db2.on('error', console.error.bind(console, 'connection error:'));
db2.once('open', function() {
    console.log('Connected');
});


router.get('/get-user-details', function (req, res, next) {
    console.log('Getting User Details');

    UserDetails.find({ username: req.query.username }, function (err, user) {
        if (err) return console.error(err);
        else {
            console.log(user);
            res.json(user);
        }
    });
});

router.post('/save-user-details', function (req, res, next) {
    console.log('Saving user details', req);

    let userDetails = new UserDetails(req.body);

    UserDetails.deleteMany({ $or: [{_id: { $eq: userDetails._id}}, {username: {$eq: userDetails.username}}] }, function (err) {
        console.log('Deleted old user details.');
    });

    userDetails.save(function (err, post) {
        if (err) return console.error(err);
        console.log("Details saved.");
        console.log('Result: ' + post);
        res.sendStatus(200);
    });
    // res.sendStatus(200);
});

router.get('/get-all-user-details', function (req, res, next) {
    console.log('Getting Users');

    UserDetails.find(function (err, users) {
        if (err) return console.error(err); //If there's an error, print it out
        else {
            console.log(users);
            res.json(users);
        }
    });
});

router.delete('/clear-user-details', function (req, res) {
    console.log('DELETE user details route');
    UserDetails.deleteMany({ $or: [{username: { $ne: ''}}, {username: {$eq: ''}}] }, function (err) {
        console.log('Deleted user details.');
    });
    res.sendStatus(200);
});




mongoose.connect('mongodb://0.0.0.0:27017/thanksgivingPicturesDB');

const pictureSchema = mongoose.Schema({
    username: String,
    title: String,
    content: String
});

const Picture = mongoose.model('Picture', pictureSchema);

const picsDb = mongoose.connection;
picsDb.on('error', console.error.bind(console, 'connection error:'));
picsDb.once('open', function() {
    console.log('Connected');
});


router.post('/save-picture', function (req, res, next) {
    console.log('Saving picture');

    let picture = new Picture(req.body);

    picture.save(function (err, post) {
        if (err) return console.error(err);
        // console.log("Picture saved.");
        // console.log('Result: ' + post);
        res.sendStatus(200);
    });
});

router.delete('/delete-picture', function (req, res) {
    console.log('DELETE picture: ', req.query.title);

    const title = req.query.title;
    Picture.deleteMany({ title: title }, function (err) {
        console.log('Deleted picture.');
    });
    res.sendStatus(200);
});

router.get('/get-all-pictures', function (req, res, next) {
    console.log("Getting all pictures");

    Picture.find(function (err, pics) {
        if (err) return console.error(err);
        else {
            console.log(pics);
            res.json(pics);
        }
    });
});

router.get('/get-user-pictures', function (req, res, next) {
    console.log('Getting User Pictures');

    const param = req.query.param;
    // {$regex : ".*" + param + ".*"}
    Picture.find({ username: param }, function (err, pics) {
        if (err) return console.error(err);
        else {
            console.log(pics);
            res.json(pics);
        }
    });
});

router.get('/get-pictures-by-title', function (req, res, next) {
    console.log('Getting User Pictures');

    const param = req.query.param;
    Picture.find({ title: param }, function (err, pics) {
        if (err) return console.error(err);
        else {
            console.log(pics);
            res.json(pics);
        }
    });
});












module.exports = router;
