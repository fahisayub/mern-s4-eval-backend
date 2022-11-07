const jwt = require("jsonwebtoken");

const authentication=async(req,res,next)=>{
    let token=req?.headers?.token?.split(' ')[1];
    if(token){
        try{

            let {email,uid}= jwt.verify(token,process.env.SECRET_KEY);
            req.body.email = email;
            req.body.uid=uid;
            next();
        }catch(err){
            res.send({"msg":err.message,"tokenstatus":'invalid'})
        }
    }else{
        res.send({'msg':"user not authenticated, please login "})
    }
}

module.exports={
    authentication
}