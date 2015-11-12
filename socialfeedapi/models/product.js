var mongoose     = require('mongoose');
var Schema= mongoose.Schema;
var ProductSchema   = new Schema({
	productID:String,prductName:String,productPrice:String,miniURL:String,coverURLs:Array
});
module.exports = mongoose.model('Product', ProductSchema);






