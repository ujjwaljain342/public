// var jwt = 
 const jwt =require('jsonwebtoken');
var df =(req,res,next)=>{
 // console.log(req.headers.cookie);
var a=req.headers.cookie;
var t=a.split("=");
	console.log(t[1]);
	try{
	const decoded = jwt.verify(t[1],"secert");
req.headers.decode = decoded;
// console.log(decoded.email);
next();	
}catch(error){
return res.status(401).json({
	msg:'auth failed'
})
}
};
module.exports=df;