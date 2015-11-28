"use strict";
var express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');


// set the environment variable to dev or production
var env;
env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// start express server
var app = express();

// configure the express server
app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(logger('dev')); // logging system for node project
app.use(bodyParser.urlencoded({
    extended: true
})); // request parser


// stylus configuration
function compile(str, path) {
    return stylus(str).set('filname', path);
}
app.use(stylus.middleware({
    src: __dirname + '/public',
    compile: compile
}));


// static files middleware
app.use(express.static(__dirname + '/public'));


// -- mongodb connection
mongoose.connect('mongodb://localhost/multivision');
var db = mongoose.connection;
db
    .on('error', console.error.bind(console, "connection Error ......... "))
    .once('open', function () {
        console.log('multivsion db opened');
    });

// mongo read from db
// TODO: remove that code to a model
var messageSchema = mongoose.Schema({message: String});
var message = mongoose.model('Message', messageSchema);
var mongoMessage;
message.findOne().exec(function (error, messageDoc) {
    mongoMessage = messageDoc.message;
});

// jade partials rendering
app.get('/partials/:partialPath', function (req, res) {
    res.render('partials/' + req.params.partialPath);
});

app.get('*', function (req, res) {
    return res.render('index', {
        mongoMessage: mongoMessage
    });
});

var port = process.env.PORT || 3000;
app.listen(port);
console.log('start listening to port ' + port + " ....");