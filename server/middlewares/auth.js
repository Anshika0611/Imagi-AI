// this will find the userId from the token and add it into the req body so that userCredit function can use it in the controller

import jwt  from "jsonwebtoken";

const userAuth= async(req,res,next)=>{
    const {token}=req.headers;

    if(!token){
        return res.json({sucess:false,message:"Not Authorized. Login Again"})
    }
    try{
        const tokenDecode=jwt.verify(token,process.env.JWT_SECRET)  // we can now access the id of the user present in the token
         req.body = req.body || {};
        if(tokenDecode.id){
            req.body.userId=tokenDecode.id; // we will attach this userId to the req body
        }else{
            return res.json({sucess:false,message:"Not Authorized. Login Again"})
        }
next(); // this will execute the controller function(userController) that will return the user credit

    }catch(error){
        res.send({sucess:false,message:error.message})
    }
}

export default userAuth;