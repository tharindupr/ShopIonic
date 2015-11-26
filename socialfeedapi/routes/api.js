var express = require('express');
var router = express.Router();

var userController = require('../controllers/user');
var productController = require('../controllers/product');
var featuredController = require('../controllers/featured');


router.route('/user/initialize')

	.post(function(req, res) {
	userController.initialize(req, res)
	});

router.route('/user/create')

	.post(function(req, res) {
	userController.save(req, res)
	});	

router.route('/user/loadlikes')

	.post(function(req, res) {
	userController.loadlikes(req, res)
	});

router.route('/user/loadfriends/:id')

	.post(function(req, res) {
	userController.loadfriends(req, res)
	});

router.route('/user/update/:id')

	.post(function(req, res) {
	userController.update(req, res)
	});



router.route('/user/isthere/:id')

	.get(function(req, res) {
	userController.isthere(req, res)
	});


router.route('/user/buy/:id')

	.post(function(req, res) {
	userController.buy(req, res)
	});

router.route('/user/friendsitems/:id')
	.get(function(req,res){
		userController.loadFriendsItems(req,res)
	});

router.route('/user/friendsitems/:id')
	.delete(function(req,res){
		userController.clearFriendsItems(req,res)
	});


router.route('/product')
	.post(function(req,res){
		productController.save(req,res)
	});

router.route('/product')
	.get(function(req,res){
		productController.see(req,res)
	});

router.route('/product/:id')
	.get(function(req,res){
		productController.getbyId(req,res)
	});

router.route('/featured')
	.post(function(req,res){
		featuredController.save(req,res)
	});

router.route('/featured')
	.get(function(req,res){
		featuredController.see(req,res)
	});

router.route('/featured/:id')
	.get(function(req,res){
		featuredController.getbyId(req,res)
	});


router.route('/test')
	.get(function(req,res){
		productController.test(req,res)
	});
module.exports = router;