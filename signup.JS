const exp=require('express');
const mongoose=require('mongoose');
const Signup=require('./mongoose.js');
var bcrypt =require('bcrypt');
const app=exp.Router();
app.use(exp.json());
app.post('/',(req,res)=>{
var data=req.body;
 bcrypt.hash(data.password,10,(err,hash)=>{
if(err){
res.status(501).send({
  msg : 'server failed to save password go and  again signup'
});
}
else{
 const signup=new Signup({
  _id:new mongoose.Types.ObjectId(),
  firstname:data.firstname,
  lastname:data.lastname,
  email:data.email,
  password:hash
 });

 Signup.find({email:data.email})
 .exec()
 .then(data=>{
 if(data.length ===  0 ){
 signup.save((err,data)=>{
if(err){
	 // assert.equal(error.errors['name'].message,
  //   'awwwww');
console.log(err);
 	res.status(500).json({
  	"msg":'Due to some issue data not being saved'
  	});
}else{
  	console.log(data);
  res.status(201).json({
  	"msg":"successfully saved data"

  })
}
 })
 }
 else{
 	console.log('user already exists');
 res.status(409).json({
 	msg:"user already exists"
 });
 }
 })
.catch(error=>{
	console.log(error);
	res.status(500).json({
		msg:error
	});
})
}
  })

});

//  .then(result=>{
//  	console.log(result);
//  res.status(201).json({
//  	"msg":"successfully saved data"

//  })
//  })
//  .catch(err=>{
//  	console.log(err);
//  	res.status(500).json({
//  	"msg":err
//  	});
// });
//console.log('hello world');

module.exports = app;