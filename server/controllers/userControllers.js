// this will have diff controller functions for user registration, login, and profile management
import userModel from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import razorpay from 'razorpay';
import transactionModel from '../models/transactionModel.js';

const registerUser= async(req,res)=>{
    try{
        //get these details from the request
        const {name,email,password}=req.body

        if(!name || !email || !password){
            return res.json({sucess:false, message:"All fields are required"})
        }
        //now encrypt the pswd
        const salt= await bcrypt.genSalt(10) //this will add moderate encryption(10 rounds of hashing) if we inc it from 10 it will make more strong encryption

        const hashedPassword= await bcrypt.hash(password,salt)

        // now get user as an object to store user data in database
        const userData={
            name,
            email,
            password:hashedPassword
        }
        // save this user data into mongodb database

        const newUser= new userModel(userData)
        const user=await newUser.save() //this will save the user data into database

        //we will generate a token which will be send in response to enable login and registration in the frontend
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET)

        //NOW WE WILL SEND THIS TOKEN WITH RESPONSE
        res.json({sucess:true,token,user:{name:user.name}})

    }catch(error){
        console.log(error);
        res.json({sucess:false, message:error.message})        
    }

}

const loginUser= async(req,res)=>{
    try {
        const {email,password}=req.body
        if(!email || !password){
           return res.send({sucess:false, message:"Some fields are empty"})
        }
        //find user 
         const user= await userModel.findOne({email})
         if(!user){
              return res.json({sucess:false, message:"user missing"})
         }
         //check for password
         const isMatch=await bcrypt.compare(password,user.password)
         if(isMatch){
            const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
            res.json({sucess:true,token,user:{name:user.name}})
         }else{
              return res.send({sucess:false, message:"Wrong password"})
         }
        
    } catch (error) {
        console.log(error);
        res.json({sucess:false, message:error.message})
    }
}

const userCredits=async(req,res)=>{
    
    try {
        const {userId}=req.body; // we will get userId from middleware
        const user=await userModel.findById(userId)
        res.json({sucess:true,credits:user.creditBalance,user:{name:user.name}})
    } catch (error) {
        console.log(error.message);
        res.json({sucess:false,message:error.message})
    }
}

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});
const paymentRazorpay=async(req,res)=>{
    try {
        const {userId,planId}=req.body;
        const userData=await userModel.findById(userId);

        if(!userId || !planId){
            return res.json({sucess:false,message:"Missing Details"});
        }
        let plan,credits,amount,date
        switch (planId) {
            case 'Basic':
                plan='Basic'
                credits=100
                amount=10
                break;

            case 'Advanced':
                plan='Advanced'
                credits=500
                amount=50
                break;
            
            case 'Business':
                plan='Business'
                credits=5000
                amount=250
                break;
        
            default:
                return res.json({sucess:false,message:"Plan not found"})
                
        }
        date=Date.now()
        const transactionData={
            userId,
            plan,
            credits,
            amount,
            date
        }
        //NOW TO ADD THIS transactionData TO MONGODB WE WILL CREATE A NEW MODEL

        const newTransaction = await transactionModel.create(transactionData);
        const options = {
            amount: amount*100,
            currency: process.env.CURRENCY,
            receipt: newTransaction._id
        };
        await razorpayInstance.orders.create(options,(error,order)=>{
            if(error){
                console.log(error);
                return res.json({sucess:false,message:error.message});
            }
            res.json({sucess:true,order})
        });
       
    } catch (error) {
        console.log(error.message);
        res.json({sucess:false,message:error.message})
        
    }
}

// we have to verify razorpay
const verifyRazorpay=async(req,res)=>{
    try {
        const {razorpay_order_id}=req.body;
        const orderInfo=await razorpayInstance.orders.fetch(razorpay_order_id);
        if(orderInfo.status==='paid'){
            const transactionData=await transactionModel.findById(orderInfo.receipt);
        
        if(transactionData.payment){
            return res.json({sucess:false,message:"Payment failed"})
        }
        const userData=await userModel.findById(transactionData.userId);
        const creditBalance=userData.creditBalance+transactionData.credits
        await userModel.findByIdAndUpdate(userData._id,{creditBalance})
        await transactionModel.findByIdAndUpdate(transactionData._id,{payment:true})
        res.json({sucess:true,message:"Credits Added"})
    }else{
        res.json({sucess:false,message:"Payment Failed"})
    }
    } catch (error) {
        console.log(error);
        res.json({sucess:false,message:error.message})
        
    }

}

export {registerUser,loginUser,userCredits,paymentRazorpay,verifyRazorpay}