var mongoose = require ('mongoose');

var RatingSchema = new mongoose.Schema({
	name: Array,
	category: String,
	ibu: String,
	abv: String,
	location: String,
	brewery: String,
	description: String
});

module.exports = mongoose.model('Rating', BeerSchema);