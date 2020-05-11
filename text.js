const conn=require('mongoose');
var dairy = new conn.Schema({
	id:conn.Schema.Types.ObjectId,
	text:{type:String , required:true},
	userid: {type:conn.Schema.Types.ObjectId , ref:'Signup' , required:true }
});
module.exports =conn.model('Dairy',dairy);