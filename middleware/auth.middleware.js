const jwt = require("jsonwebtoken")
const {UserModel}=require("../model/user.model")
const {blacklist} =require("../blacklist")
const auth= async(req,res,next)=>{
    try{
        const token=req.headers.authorization.split(' ')[1];
        if(blacklist.includes(token,"chandan")){
            return res.status(401).json({message:'Unathorized'});
        }
    const decodeToken=jwt.verify(token,"chandan");
    console.log(decodeToken)
    const {userId}=jwt.decodeToken;


    //check if the users exits or not 
    const user = await UserModel.findById(userId)

    if(!user){
        return res.status(401).json({message:'Unathorized'});

    }
    //atach the object here
    req.user=user;
    next();

    }catch(error){
        console.log(error)
        return res.status(401).json({message:'Unathorized',err:error.message});
    }
};

module.exports={auth}