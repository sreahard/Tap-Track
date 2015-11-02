var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var rating = require('../model/ratingModel');

router.use(bodyParser.urlencoded({ extended: true }));

router.route('/')
	.get(function(req, res){
		mongoose.model('Rate').find({}, function(err, rating){
			if(err){
				return console.log('err');
			} else {
				res.json(rating);
			}
		});
	})

	.post(function(req, res){
		var aroma =  req.body.aroma;
		var appearance = req.body.appearance;
		var category = req.body.category;
		var taste = req.body.taste;
		var overall = req.body.overall;
		mongoose.model('Rate').create({
			aroma: aroma,
			appearance: appearance,
			category: category,
			taste: taste,
			overall: overall,

		},
		function(err, rating){
			if(err){
				res.send("not working");
			} else {
				console.log("New rating aromad " + rating + " created!");
				res.send(rating);
			}
		});
	});

router.route('/:id')
	.get(function(req, res) {
		mongoose.model('Rate').findById({
			_id: req.params.id
		}, function(err, rating) {
			if(err)
				res.send(err);
				res.json(rating);
		});
	})

	.put(function(req, res) {
		mongoose.model('Rate').findById(req.params.id, function(err, rating){
			if(err)
				res.send(err);
			rating.aroma = req.body.aroma;
			rating.appearance = req.body.appearance;
			rating.category = req.body.category;
			rating.taste = req.body.taste;
			rating.overall = req.body.overall;
			console.log(JSON.stringify(rating));

			rating.save(function(err) {
				if(err)
					res.send(err);
					res.json({ message: "rating was updated"});
			});

		});
	})

	.delete(function(req, res) {
		mongoose.model('Rate').remove({
			_id: req.params.id
		}, function(err, rating) {
			if(err)
				res.send(err);
				res.json({ message: 'Successfully Deleted'});
		});
	});

module.exports = router;