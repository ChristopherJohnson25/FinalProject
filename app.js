var express = require('express');
var favicon = require('serve-favicon');
var path = require('path');
var bodyParser = require('body-parser');
var request = require('request');
var ig = require('instagram-node').instagram();

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



app.get('/', function(req, res){
	request('http://magicseaweed.com/api/'+process.env.SEAWEED_KEY+'/forecast/?spot_id=10', function(err, results){
		if (err) {
			console.log("error")
		}
		body = JSON.parse(results.body)
		// console.log(body)
		swellDirection = Math.ceil(body[0].swell.components.combined.direction/5)*5
		// console.log(swellDirection)
		res.render('index', {results: body})
	})

	

});

app.get('/report/:id', function(req, res){
	var locationId = req.params.id;
	console.log('LOCATION ID ', locationId);
	request('http://magicseaweed.com/api/'+process.env.SEAWEED_KEY+'/forecast/?spot_id=' + locationId, function(err, results){
		if (err) {
			console.log("error")
		}
		var body = JSON.parse(results.body);
		// console.log('BODY ', body);
		swellDirection = Math.ceil(body[0].swell.components.combined.direction/5)*5
		res.render('report', {results: body})
	});
});

app.get('/api/locations', function(req, res) {
	console.log('HIT API LOCATIONS');
	db.collection('locations').find({}).toArray(function(err, result) {
 		res.send(result) 
 	})
});


app.listen(process.env.PORT || '3000');