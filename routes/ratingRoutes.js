var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Beer = require('../model/beerModel');


router.use(bodyParser.urlencoded({ extended: true }));

router.route('/')
	.get(function(req, res){
		mongoose.model('Beer').find({}, function(err, beer){
			if(err){
				return console.log('err');
			} else {
				res.json(beer);
			}
		});
	})



router.route('/:id')
	

	.get(function(req, res) {
		mongoose.model('Beer').findById({
			_id: req.params.id
		}, function(err, beer) {
			if(err)
				res.send(err);
				res.json(beer);
		});
	})

	.put(function(req, res) {
		mongoose.model('Beer').findById(req.params.id, function(err, beer){
			if(err)
				res.send(err);
			
			beer.rating[0].tasting_notes = req.body.tasting_notes;
			beer.rating[0].overall = req.body.overall;
			beer.rating[0].user_id = req.body.user_id;
			
			console.log(JSON.stringify(beer));

			beer.save(function(err) {
				if(err)
					res.send(err);
					res.json({ message: "Beer was updated"});
			});

		});
	})

//get all ratings by beer ID

	.delete(function(req, res) {
		mongoose.model('Beer').remove({
			_id: req.params.id
		}, function(err, beer) {
			if(err)
				res.send(err);
				res.json({ message: 'Successfully Deleted'});
		});
	});

module.exports = router;