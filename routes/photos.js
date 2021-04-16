var express = require('express');
var router = express.Router();
var model = require('./../lib/model/model-photos');

/* GET photo by ID */
router.get('/id/:id', function(req, res) {
	if(req.params('id')){
		var params = {
			photoID: req.params('id')
		}
		model.getPhotoByID(params, function(err, obj){
			if(err){
				res.status(400).send({error: 'Invalid photo ID'});
			} else {
				res.send(obj);
			}
		});
	} else {
		res.status(400).send({error: 'Invalid login'});		
	}
});

/* POST create photo. */
router.post('/upload', function(req, res) {
 	if(req.params('albumID') && req.params('userID')){
 		var params = {
 			userID: req.params('userID'),
 			albumID: req.params('albumID')
 		}
 		if(req.params('caption')){
 			params.caption = req.params('caption');
 		}

 		model.createPhoto(params, function(err, obj){
			if(err){
				res.status(400).send({error: 'Invalid photo data'});
			} else {
				res.send(obj);
			}
 		});
	} else {
		res.status(400).send({error: 'Invalid photo data'});				
	}
});

/* POST delete photo. */
router.post('/delete', function(req, res) {
	if(req.params('id')){
		var params = {
			photoID: req.params('id')
		}
		model.deletePhoto(params, function(err, obj){
			if(err){
				res.status(400).send({error: 'Photo not found'});
			} else {
				res.send(obj);
			}
		});
	} else {
		res.status(400).send({error: 'Invalid photo ID'});		
	}
});


module.exports = router;
