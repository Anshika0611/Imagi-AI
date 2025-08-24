import express from 'express';
import {registerUser,loginUser, userCredits} from '../controllers/userControllers.js'
import userAuth from '../middlewares/auth.js';

const userRouter=express.Router()
// adding endpoints

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/credits',userAuth,userCredits) 

export default userRouter

//now we will add this userRouter in our express app(server.js)

// Localhost:4000/api/user/register

// Localhost:4000/api/user/login