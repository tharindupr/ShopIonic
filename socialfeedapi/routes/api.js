var express = require('express');
var router = express.Router();

var userController = require('../controllers/user');


router.route('/initialize')

	.post(function(req, res) {
	userController.initialize(req, res)
	});


router.route('/user')

	.post(function(req, res) {
	userController.loadlikes(req, res)
	});



router.route('/create')

	.post(function(req, res) {
	userController.save(req, res)
	});	

router.route('/isthere/:id')

	.get(function(req, res) {
	userController.isthere(req, res)
	});

module.exports = router;