// beer.js -- JavaScript file that will hold our beer model

// load required packages
var mongoose = require('mongoose');

//define our beer schema
var BeerSchema = new mongoose.Schema({
	"name": String,
	"type": String,
	"quantity": Number,
	"userId":String
});

//export the Mongoose model
module.exports = mongoose.model('Beer', BeerSchema);

// so far we have
// 1. loaded Mongoose package
// 2. created a mongoose schema which maps to a MongoDB collection and defines the shape of the documents within that collection
// 3. defined our schema to contain 2 sings and 1 number
// 4. exported the Mongoose beer model for use within our app
