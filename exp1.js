const exp=require('express');
const app=exp();
app.use(exp.json());
 app.get('/',(req,res)=>{
// localStorage.setItem('hello','shivam');

res.sendFile(__dirname+'/signup.html');
 });


app.get('/home',(req,res)=>{
// localStorage.setItem('hello','shivam');

res.sendFile(__dirname+'/login.html');
 });
 






const port =process.env.PORT||3000;




var ack=(p)=>{
console.log(`listening on port ${p}......`);
}
	

app.listen(port,ack(port));
