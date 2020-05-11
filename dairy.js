var exp=require('express');
var Dairy = require('./text');
var Signup=require('./mongoose');
// var id =require('./backend');

var mongoose =require('mongoose');
// var app=exp();
const app=exp.Router();
app.use(exp.json());
var  safeid=null; 
app.post('/',(req,res)=>{
	var data=req.body;
safeid = data.id;

});
app.get('/find',(req,res)=>{
	if(safeid==null){
res.send({ para:'loginfirst' });
	}else {
		Dairy.find({userid : safeid})
		.populate("userid")
		.exec()
		.then(data=>{
			console.log(data);
			console.log(safeid);
if(data.length == 0){
res.send({para:data});
}else{
	res.send({para:data});
}
	}) 
	.catch(error=>{
res.send({para:'reload'});
	})	
	}

})

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