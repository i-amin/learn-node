var express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyParser = require('body-parser');


// set the environment variable to dev or production
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

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


app.get('*', function (req, res) {
    return res.render('index');
});


var port = 3000;
app.listen(port);
console.log('start listening to port ' + port + " ....");