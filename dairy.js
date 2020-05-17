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
// app.get('/find',checkauth ,(req,res)=>{
// 	if(safeid==null){
// res.send({ para:'loginfirst' });
// 	}
// 	else {
// 		Dairy.find({userid : safeid})
// 		.populate("userid")
// 		.exec()
// 		.then(data=>{
// 			console.log(data);
// 			console.log(safeid);
// if(data.length == 0){
// res.send({para:data});
// }else{
// 	res.send({para:data});
// }
// 	}) 
// 	.catch(error=>{
// res.send({para:'reload'});
// 	})	
// 	}

// })

app.post('/home',(req,res)=>{
	var data =req.body;
const text= new Dairy({
	id :new mongoose.Types.ObjectId(),
    text : data.text,
    userid : safeid
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
app.delete('/delete',(req,res)=>{
Dairy.remove({userid:safeid})
.exec()
.then(data=>{
 return Signup.remove({_id : safeid });

})
.then(data1=>{
		res.send({
		msg:'resource deleted'
	})
	})
.catch(error =>{
	res.send({
		msg:'failed to delete resource'
	});
})
})

module.exports = app;