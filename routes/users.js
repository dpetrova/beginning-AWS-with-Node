var express	= require('express');
var router = express.Router();
var model = require('./../lib/model/model-users');

/* GET users listing. */
router.get('/', function(req, res) {
  model.getAllUsers(function(err, obj){
  	if(err){
  		res.status(500).send({error: 'An unknown server error has occurred!'});
  	} else {
  		res.send(obj);
  	}
  })
});


/* GET albums by user */
router.get('/user/:user', function(req, res) {
	var params= {
		username: req.params('user')
	}
	model.getUser(params, function(err, obj){
		if(err){
	  		res.status(500).send({error: 'An unknown server error has occurred!'});
	  	} else {
	  		res.send(obj);
	  	}
	});
});

/* POST user login. */
router.post('/login', function(req, res) {
	if(req.params('username') && req.params('password') ){
		var params = {
			username: req.params('username').toLowerCase(),
			password: req.params('password')
		};

		model.loginUser(params, function(err, obj){
			if(err){
				res.status(400).send({error: 'Invalid login'});
			} else {
				res.send(obj);
			}
		});		
	} else {
		res.status(400).send({error: 'Invalid login'});
	}
});

/* POST user logout. */
router.post('/logout', function(req, res) {
	if(req.params('userID')){
		model.logoutUser({}, function(err, obj){
			if(err){
				res.status(400).send({error: 'Invalid user'});
			} else {
				res.send(obj);
			}
		});
	} else {
		res.status(400).send({error: 'Invalid user'});		
	}
});

/* POST user registration. */
router.post('/register', function(req, res) {
	if(req.params('username') && req.params('password') && req.params('email')){
		var email = unescape(req.params('email'));
		var emailMatch = email.match(/\S+@\S+\.\S+/);
		if (emailMatch !== null) {
			var params = {
				username: req.params('username').toLowerCase(),
				password: req.params('password'),
				email: req.params('email').toLowerCase()
			};

			model.createUser(params, function(err, obj){
				if(err){
					res.status(400).send({error: 'Unable to register'});
				} else {
					res.send(obj);
				}
			});
		} else {
			res.status(400).send({error: 'Invalid email'});
		}
	} else {
		res.status(400).send({error: 'Missing required field'});
	}
});

module.exports = router;
