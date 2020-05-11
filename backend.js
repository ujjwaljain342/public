const exp=require('express');
const mongoose=require('mongoose');
//mongodb atlas
mongoose.connect('mongodb+srv://shivam:icecream123@cluster0-srsrf.mongodb.net/test?retryWrites=true&w=majority',{
useNewUrlParser:true,
useUnifiedTopology: true
});
//connection to mongoose.js (connect to mongodb server)
const Signup=require('./mongoose');
const app=exp();
//middleware signup.js
const signupackage=require('./signup');
app.use('/signup',signupackage);
app.use(exp.json());
// home page database
const dairy =require('./dairy');
app.use('/savehome',dairy);
// signup page 
 app.get('/',(req,res)=>{
res.sendFile(__dirname+'/signup.html');
 });
 app.get('/home',(req,res)=>{
res.sendFile(__dirname+'/home.html');
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

Signup.find({ email:data.email , password:data.password })
.exec()
 .then(dbdata=>{
 	if(dbdata.length==0){
 		console.log('New User Requested to login');
 		res.status(501).send({
 			msg:'gotologin'
 		});
 	}else {
 	//id 	
console.log('old user go to home page' +  dbdata[0]._id);
res.send({
	msg:'gotohome',
	id:dbdata[0]._id
});

 	}
 })
 .catch(error=>{
 	console.log(error);

 })
 })
//connection of port
const port =process.env.PORT||3000;
var ack=(p)=>{
console.log(`listening on port ${p}......`);
}
	

app.listen(port,ack(port));