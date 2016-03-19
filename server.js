// get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser'); // package needed in order to accept data via POST or PUT
var beerController = require('./controllers/beer');
var userController = require('./controllers/user');
var passport = require('passport');
var authController = require('./controllers/auth');

// connect to the beerlocker MongoDB
mongoose.connect('mongodb://localhost:27017/beerlocker');

//create our Express app
var app = express();

// use body-parser package in app
app.use(bodyParser.urlencoded({
	extended: true
}));

// Use the passport package in our application
app.use(passport.initialize());

// use environment defined port or 3000
var port = process.env.PORT || 3000;

// create our Express router
var router = express.Router();

router.route('/beers')
	.post(authController.isAuthenticated, beerController.postBeers)
	.get(authController.isAuthenticated, beerController.getBeers);

router.route('/beers/:beer_id')
	.get(authController.isAuthenticated, beerController.getBeer)
	.put(authController.isAuthenticated, beerController.putBeer)
	.delete(authController.isAuthenticated, beerController.deleteBeer);

router.route('/users')
	.post(userController.postUsers)
	.get(authController.isAuthenticated, userController.getUsers);


/*
// initial dummer route for testing
// http://localhost:3000/api
router.get('/', function(req, res) {
	res.json({
		message: 'You are running dangerously low on beer!'
	});
});
*/

// register all our routes with /api
app.use('/api',router);


// start the server
app.listen(port);
console.log('Insert beer on port ' + port);
