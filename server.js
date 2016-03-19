// get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser'); // package needed in order to accept data via POST or PUT
var Beer = require('./models/beer'); // this is our local custom js file

// connect to the beerlocker MongoDB
mongoose.connect('mongodb://localhost:27017/beerlocker');

//create our Express app
var app = express();

// use environment defined port or 3000
var port = process.env.PORT || 3000;

// create our Express router
var router = express.Router();

// initial dummer route for testing
// http://localhost:3000/api
router.get('/', function(req, res) {
	res.json({
		message: 'You are running dangerously low on beer!'
	});
});


// use body-parser package in app
app.use(bodyParser.urlencoded({
	extended: true
}));

// createa  new route with the prefix /beers
var beersRoute = router.route('/beers');

//create endpoint /api/beers for POSTS
beersRoute.post(function(req,res){

	//create a new instance of the Beer model
	var beer = new Beer();

	//set the beer properties that came from the POST data
	beer.name = req.body.name;
	beer.type = req.body.type;
	beer.quantity = req.body.quantity;

	// save the beer and check for errors
	beer.save(function(err){
		if (err) res.send(err);

		res.json({message: 'Beer added to the locker!', data:beer});
	});
});

// above code creates new route with prefix /beers and sets up what to do when we want to POST to that endpoint
// in this case we create a new Beer model, set properties to those passed in, and call save on Beer model which is a Mongoose function that save to MongoDB

// create endpoint /api/beers for GET
beersRoute.get(function(req, res) {
	Beer.find(function(err, beers) {
		if (err) res.send(err);
		res.json(beers);
	});
});

var beerRoute = router.route('/beers/:beer_id');

beerRoute.get(function(req, res) {
	Beer.findById(req.params.beer_id, function(err, beer) { // findById is Mongoose Beer model function
		if (err) res.send(err);
		res.json(beer);
	});
});

// create endpiont /api/beer/:beer_id for PUT
beerRoute.put(function(req, res) {
	// use Beer model to find specific beer
	Beer.findById(req.params.beer_id, function(err, beer) {
		if (err)res.send(err);

		//update existing beer quantity
		beer.quantity = req.body.quantity;

		//save beer and check for errors
		beer.save(function(err){
			if (err) res.send(err);
			res.json(beer);
		});
	});
});

beerRoute.delete(function(req,res){
	Beer.findByIdAndRemove(req.params.beer_id,function(err){
		if (err) res.send(err);
		res.json({message: 'Beer removed from the locker!'});
	});
});

// register all our routes with /api
app.use('/api',router);


// start the server
app.listen(port);
console.log('Insert beer on port ' + port);
