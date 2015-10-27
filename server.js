var express = require('express');
var app = express();
var http = require('http');
var path = require('path');
var fs = require('fs');
var db = require('./model/db');



var beerModel = require ('./model/beerModel');
var beerRoutes = require ('./routes/beerRoutes');

//Routes========================================================================
app.use('/api/beer', beerRoutes);



// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static('public'));

// use res.render to load up an ejs view file

// index page 
app.get('/', function(req, res) {
    res.render('pages/index');
});

// about page 
app.get('/about', function(req, res) {
    res.render('pages/about');
});

app.get('/enter_beer', function(req, res) {
    res.render('pages/enter_beer');
});

app.listen(9090);
console.log('9090 is the magic port');