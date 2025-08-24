import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    name:{type: String, required:true},
    email:{type: String , required:true, unique:true},
    password:{type: String, required:true},
    creditBalance:{type:Number, default:5},
})
 // using this usermodel we have created user in the database
const userModel=mongoose.models.user || mongoose.model("user",userSchema)

export default userModel