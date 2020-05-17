// var jwt = 
 const jwt =require('jsonwebtoken');
var df =(req,res,next)=>{
var a=req.headers.cookie;
var t=a.split("=");
	console.log(t[1]);
	try{
	const decoded = jwt.verify(t[1],"secert");
console.log(decoded);
next();	
}catch(error){
return res.status(401).json({
	msg:'auth failed'
})
}
};
module.exports=df;