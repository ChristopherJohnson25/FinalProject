var express = require('express');
var favicon = require('serve-favicon');
var path = require('path');
var bodyParser = require('body-parser');
var request = require('request');
// var msw = require('msw-api');


var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// msw.set({ apiKey: process.env.SEAWEED_KEY, units: 'us' });

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));


// msw.forecast(358).then(function (forecast) {
//    console.log('Successfully retrieved data for New Jersey');
// }, function (err) {
//     console.log('ERR: encountered error getting MSW data: ' + err);
// });

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

app.get('/report/1', function(req, res){
	request('http://magicseaweed.com/api/'+process.env.SEAWEED_KEY+'/forecast/?spot_id=10', function(err, results){
		if (err) {
			console.log("error")
		}
		body = JSON.parse(results.body)
		swellDirection = Math.ceil(body[0].swell.components.combined.direction/5)*5
		res.render('report', {results: body})
	})
});


app.listen(process.env.PORT || '3000');