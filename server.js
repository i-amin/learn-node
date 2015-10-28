var express = require('express');


// set the environment variable to dev or production
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// start express server
var app = express();

// configure the express server
app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');

app.get('*', function (req, res) {
    res.render('index');
});

var port = 3000;
app.listen(port);
console.log('start listening to port ' + port + " ....");