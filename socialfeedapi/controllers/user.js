exports.save = function (req, res) {
/*var artist= new Artist();
artist.name=req.body.name;
artist.style=req.body.style;
artist.location=req.body.location;
artist.save(function(err) {
if (err) res.send(err);*/
console.log(req.body.token);



res.json({ message: 'created!' });

};