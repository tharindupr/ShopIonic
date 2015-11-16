var Featured = require('../models/featured');

exports.save = function (req, res) {
json=req.body[0]
var featured= new Featured();
featured.productID=json.id;
featured.prductName=json.name;
featured.productPrice=json.price;
featured.miniURL=json.miniURL;
featured.coverURLs=json.coverURLs;
featured.stars=json.stars;
featured.comments=json.comments;
featured.save(function(err) {
if (err) res.send(err);
res.json({ message: 'created!' });
});
};


exports.see = function(req, res) {
Featured.find(function(err, val) {
if (err)
	res.send(err);
		res.json(val);
}); 
};


exports.getbyId = function(req, res) {
	Featured.find({ 'productID':  req.params.id }, function (err, rcd) {
		if (err) console.log(err);
		res.json(rcd);
	});
};