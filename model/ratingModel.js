var mongoose = require ('mongoose');

var RatingSchema = new mongoose.Schema({
	aroma: String,
	appearance: String,
	taste: String,
	overall: { type: Number, min: 0, max: 5 }
});

module.exports = mongoose.model('Rate', RatingSchema);