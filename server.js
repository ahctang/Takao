// node js web server

var express = require('express'); //Express router
var mongoose = require('mongoose'); //mongooDB mongoose access driver
var morgan = require('morgan'); //node js console log
var bodyParser = require('body-parser'); //break down RESTful requests
//var methodOverride = require('method-override');

var privateConstants = require('./src/privateConstants.js');
var app = express(); //Express instance

//configuration
mongoose.connect(privateConstants.connectionString);
var redditEntry = require('./src/models/redditEntry.js');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    'extended': 'true'
}));
app.use(bodyParser.json());

function getAllPosts(res) {
    redditEntry.find(function(err, redditEntries) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(redditEntries); // return all todos in JSON format
    });
};

// routes for express ==================================================
// api ---------------------------------------------------------------------
// get all todos
app.get('/api/getAllEntries/', function(req, res) {
    // use mongoose to get all documents in the RedditPosts collection from the reddit_crawler database
    getAllPosts(res);
});

//delete a reddit entry
app.delete('/api/deleteEntry/:redditEntry_id', function(req, res) {
    redditEntry.remove({
        _id: req.params.redditEntry_id
    }, function(err, redditEntry) {
        if (err)
            res.send(err);

        getAllPosts(res);
    });
});


app.get('*', function(req, res) {
    res.sendfile('./public/index.html'); //Send the main view file
});


app.listen(8080);
console.log("Takao ready on port: 8080");
