var express = require('express');
var router = express.Router();
var model = require('./../lib/model/model-albums');

/* GET album by ID */
router.get('/id/:albumID', function(req, res) {
	if(req.params('albumID')){
		var params = {
			albumID: req.params('albumID')
		}
		model.getAlbumByID(params, function(err, obj){
			if(err){
				res.status(400).send({error: 'Invalid album ID'});
			} else {
				res.send(obj);
			}
		});
	} else {
		res.status(400).send({error: 'Invalid album ID'});		
	}
});

/* POST create album. */
router.post('/upload', function(req, res) {
 	if(req.params('title') && req.params('userID')){
 		var params = {
 			userID: req.params('userID'),
 			title: req.params('title')
 		}
 		model.createAlbum(params, function(err, obj){
			if(err){
				res.status(400).send({error: 'Invalid album data'});
			} else {
				res.send(obj);
			}
 		});
	} else {
		res.status(400).send({error: 'Invalid album data'});				
	}
});

/* POST delete album. */
router.post('/delete', function(req, res) {
	if(req.params('albumID')){
		var params = {
			albumID: req.params('albumID')
		}
		model.deleteAlbum(params, function(err, obj){
			if(err){
				res.status(400).send({error: 'Album not found'});
			} else {
				res.send(obj);
			}
		});
	} else {
		res.status(400).send({error: 'Invalid album ID'});		
	}
});

module.exports = router;
