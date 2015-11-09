var express = require('express');
var router = express.Router();

var userController = require('../controllers/user');


router.route('/user/initialize')

	.post(function(req, res) {
	userController.initialize(req, res)
	});


router.route('/user/loadlikes')

	.post(function(req, res) {
	userController.loadlikes(req, res)
	});


router.route('/user/update/:id')

	.post(function(req, res) {
	userController.update(req, res)
	});



router.route('/user/create')

	.post(function(req, res) {
	userController.save(req, res)
	});	

router.route('/user/isthere/:id')

	.get(function(req, res) {
	userController.isthere(req, res)
	});

module.exports = router;