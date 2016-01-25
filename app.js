var express = require('express');
var favicon = require('serve-favicon');
var path = require('path');
var bodyParser = require('body-parser');
var request = require('request');
var Instafeed = require("instafeed.js");


var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var mongoUrl = "mongodb://localhost:27017/surfApp";
var db;


MongoClient.connect(mongoUrl, function(err, database){
  if (err) {
    console.log(err);
  }
  console.log("connected!");
  db = database;
  process.on('exit', db.close);
})


//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(express.static(path.join(__dirname, 'node_modules')));

// var getRandom = function(){
// 	return Math.floor(Math.random()*1234)
// };




app.get('/', function(req, res){
	var ids = Array(384,383,381,2159,386,4214,295,4211,669,3682,3051,2226,2568,4147,4149);
	var randoId = ids[Math.floor(Math.random()*ids.length)];
	db.collection('locations').find({}).toArray(function(err, locations){
		request('http://magicseaweed.com/api/'+process.env.SEAWEED_KEY+'/forecast/?spot_id='+randoId, function(err, results){
			if (err) {
				console.log("error")
			}
			body = JSON.parse(results.body)
			swellDirection = Math.ceil(body[0].swell.components.combined.direction/5)*5
			res.render('index', {results: body, locations: locations, randoId: randoId});
		});
	});
});

app.get('/report/:id', function(req, res){
	var locationId = parseInt(req.params.id);
	console.log(locationId);
	db.collection('locations').find({id:locationId}).toArray(function(err, spot) {
		request('http://magicseaweed.com/api/'+process.env.SEAWEED_KEY+'/forecast/?spot_id='+ locationId, function(err, results){
			if (err) {
				console.log("error!", err)
			} try {
				console.log(spot)//empty array!?!?!?!
				var body = JSON.parse(results.body);
				console.log(results.body)
				swellDirection = Math.ceil(body[0].swell.components.combined.direction/5)*5
				res.render('report', {results: body, locationId: locationId, spot: spot})
			} catch(e) {
				console.log('errerrerer',e);
				res.send("We're sorry. we're having some problems with the api.");
			}
		});
	});
});






app.get('/api/locations', function(req, res) {
	console.log('HIT API LOCATIONS');
	db.collection('locations').find({}).toArray(function(err, result) {
 		res.send(result) 
 	})
});


app.listen(process.env.PORT || '3000');