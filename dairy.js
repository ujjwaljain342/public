var exp=require('express');
// const url =require('url');
var Dairy = require('./text');
var Signup=require('./mongoose');
// var id =require('./backend');
var checkauth =require('./checkauth');

var mongoose =require('mongoose');
// var app=exp();
const app=exp.Router();
 app.use(exp.json());	
// var  safeid=null; //global variable 
// app.post('/',checkauth,(req,res)=>{
// 	var data=req.body;
// });
 app.get('/',checkauth,(req,res)=>{
 	console.log("data entered");

 	// console.log(req.headers.cookie);
 	// console.log(req.headers.decode);
// res.render("http://localhost:3000/savehome");
// res.redirect('/savehome/home');		
  res.sendFile(__dirname+'/home.html');

 });
//   app.get('/home',checkauth,(req,res)=>{
//  	console.log("data entered");
// // res.render("http://localhost:3000/savehome");
// // res.redirect("localhost:3000/savehome");		
//  // req.url ="http:localhost:3000/savehome/how";
//  res.sendFile(__dirname+'/home.html');


//  });
 
//checkauth
 app.get('/find',checkauth ,(req,res)=>{

 		Dairy.find({userid : req.headers.decode.userid})
 		.populate("userid")
 		.exec()
 		.then(data=>{
 			console.log(data);
 			// console.log(safeid);
if(data.length == 0){
 res.send({para:data});
 }else{
 	res.send({para:data});
 }
 	}) 
.catch(error=>{
 res.send({para:'reload'});
 	})	
 	
 })

app.post('/home',checkauth,(req,res)=>{
	var data =req.body;
const text= new Dairy({
	id :new mongoose.Types.ObjectId(),
    text : data.text,
    userid : req.headers.decode.userid
})
text.save()
.then(data=>{
	console.log('data saved');
res.status(201).send({
	msg:'resource created'
})
})
.catch(error=>{
	console.log('error in dairy page');
res.status(501).send({
	msg:'resource not created'
})
})
});
app.delete('/delete',checkauth,(req,res)=>{
Dairy.remove({userid:req.headers.decode.userid})
.exec()
.then(data=>{
 return Signup.remove({_id :req.headers.decode.userid });

})
.then(data1=>{
		res.send({
		msg:'resource deleted'
		// window.location.assign("http://localhost:3000/l");
	})
	})
.catch(error =>{
	res.send({
		msg:'failed to delete resource'
	});
})
})

module.exports = app;