const exp=require('express');
const mongoose=require('mongoose');
const bcrypt =require('bcrypt');
var jwt =require('jsonwebtoken');
//mongodb atlas
mongoose.connect('mongodb+srv://shivam:icecream123@cluster0-srsrf.mongodb.net/test?retryWrites=true&w=majority',{
useNewUrlParser:true,
useUnifiedTopology: true
});
// const Token;
//connection to mongoose.js (connect to mongodb server)
const Signup=require('./mongoose');
const app=exp();
//middleware signup.js
const signupackage=require('./signup');
app.use('/signup',signupackage);
app.use(exp.json());
// home page database
const dairy =require('./dairy');
// app.use('/savehome',(req,res,next)=>{
// 	req.header.Authorization =`${Token}`;
// })
app.use('/savehome',dairy);
// signup page 

 app.get('/',(req,res)=>{
res.sendFile(__dirname+'/signup.html');
 });

// login page 
 app.get('/l',(req,res)=>{
 // res.redirect('/hello'); 
 res.sendFile(__dirname+'/login.html');
//res.end();
 })	

 app.post('/login',(req,res)=>{

 	var data = req.body;
 	console.log(data.email);
 	console.log(data.password);

Signup.find({ email:data.email})
.exec()
 .then(dbdata=>{
 	console.log(dbdata);
if(dbdata.length == 0){
 		console.log('New User Requested to login');
 		res.status(401).send({
 			msg:'gotologin'
 		});
 	}
 	else {
bcrypt.compare(data.password, dbdata[0].password,(err,result)=>{
if(err){
	res.status(401).send({
msg: 'gotologin'
 	});

}else if(result) 
{
	const Token = jwt.sign({
email : dbdata[0].email,
userid : dbdata[0]._id
	} ,
	"secert",
{
	expiresIn :"1h"
}
	);
	// jwt.verify()
	console.log(Token);
// console.log('old user go to home page  ' +  dbdata[0]._id);
res.send({

	msg:'gotohome',
	token:Token//token

});

}else {

	res.status(401).send({
msg: 'gotologin'
 	});

}

})
 	}
 })
 .catch(error=>{
 	console.log(error);
 	res.status(401).send({
msg: 'gotologin'
 	});

 })
 })
//connection of port
const port =process.env.PORT||3000;
var ack=(p)=>{
console.log(`listening on port ${p}......`);
}
	

app.listen(port,ack(port));