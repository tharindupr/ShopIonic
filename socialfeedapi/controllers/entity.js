var mongoose     = require('mongoose');
var MongoClient = require('mongodb').MongoClient;



exports.listEntities = function(req, res) {
dbname=req.body.dbname;
MongoClient.connect('mongodb://localhost/'+dbname, function(err,db) {
db.listCollections().toArray(function(err, collections){
    //collections = [{"name": "coll1"}, {"name": "coll2"}]
   
    res.json(collections);
});

});


mongoose.connection.close()
};







exports.listMeta = function(req, res) {
dbname=req.body.dbname;
entity=req.body.entity

MongoClient.connect('mongodb://localhost/'+dbname, function(err,db) {


doc=MongoClient.findOne();

for (key in doc) console.log(key);


});

res.json("'collections':'2'");

};