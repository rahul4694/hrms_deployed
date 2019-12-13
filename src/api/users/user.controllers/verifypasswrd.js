const jwt = require("jwt-simple");
const User=require("../user.model")
const verify=async(req,res,next)=>{
try{
const decodedtoken = jwt.decode(req.params.token,"secretKey");
const { userEmail } = decodedtoken;

const user=await User.findOne({email:userEmail})

const password=user.name+2019
res.send(`Your previous password ${password}`)
// req.email=userEmail
// req.method="post"
// res.redirect("http://localhost:5050/changepassword")


// next()
}catch(e){
res.send("wrong token catch")
}
}
module.exports = { verify }