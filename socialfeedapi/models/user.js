var mongoose     = require('mongoose');
var Schema= mongoose.Schema;
var UserSchema   = new Schema({
fname:String,lname:String,id:String,email:String,likes:Array
});
module.exports = mongoose.model('User', UserSchema);