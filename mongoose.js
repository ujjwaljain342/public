 const mongoose =require('mongoose');
 var signupSchema=new mongoose.Schema({
   _id:mongoose.Schema.Types.ObjectId,
    firstname:{type:String,required:true,},
    lastname:String,
    email:{ type:String ,required:true ,unique:true },
    password:String, 
  
 });
 module.exports=mongoose.model('Signup',signupSchema);
