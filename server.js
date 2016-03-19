// get the packages we need
var express = require('express');

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

// register all our routes with /api
app.use('/api',router);

// start the server
app.listen(port);
console.log('Insert beer on port ' + port);
