// server.js

// modules =================================================
var express        = require('express'),
	app            = express(),
	bodyParser     = require('body-parser'),
	methodOverride = require('method-override'),
	mongoose	   = require('mongoose'),
	passport 	   = require('passport'),
	path 		   = require('path'),
	session 	   = require('express-session');
// load api


// configuration ===========================================  

// set our port
var port = process.env.PORT || 8080; 

// session
app.use(session({
		secret: 'smallappsecret-123456',
		resave: true,
    	saveUninitialized: true
    }));

// Congifure server
app.use(bodyParser.json()); 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(methodOverride('X-HTTP-Method-Override')); 

// set what is public
app.use(express.static(__dirname + '/public'));

// routes ==================================================
require('./server/routes')(app);

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);               


console.log("\nserver working on http://localhost:8080");
console.log("---------------------------------------\n\n");

// expose app           
exports = module.exports = app;                         


