const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  let ip = req.ip;
  let { email, password, username } = req.body;
  let user = await UserModel.findOne({ email: email });
  if (user) {
    res.send({ msg: "User already exists" });
  } else {
    bcrypt.hash(password, 3, async (err, hashpassword) => {
      if (err) {
        res.send({ msg: "Something went wrong" });
      } else {
        let hashuser = {
          email: email,
          password: hashpassword,
          username: username,
          ipaddress: ip,
        };
        let newuser = await UserModel.insertMany([hashuser]);
        let token = await jwt.sign({ email,uid:newuser._id }, process.env.SECRET_KEY,{expiresIn:'5h'});
        let payload = {
          msg: "Account created successfully",
          user: newuser,
          token: token,
        };
        res.send(payload);
      }
    });
  }
};


const login = async (req, res) => {
  let { email, password } = req.body;
  let user = await UserModel.findOne({ email: email });
  if(user.email){

      await bcrypt.compare(password,user.password,(err,result)=>{
          
    if(result){
        let token =  jwt.sign({ email,uid:user._id }, process.env.SECRET_KEY,{expiresIn:'5h'});
        let payload = {
          msg: "User Loggedin successfully",
          token: token,
        };
        res.send(payload);
        
    }else{
        res.send({"msg":"Invalid user credentials","error":err});
        
    }
})
}else{
    res.send({"msg":"User does not exist, please signup first"});
}


};





const UserController = {
  signup,
  login,
};

module.exports = {
  UserController,
};
