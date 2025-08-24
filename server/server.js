import express from 'express';
import cors  from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import userRouter from './routes/user.js';
import imageRouter from './routes/imageRoutes.js';

const PORT= process.env.PORT || 4000

const app=express();
//middlewares
app.use(express.json());
app.use(cors());

await connectDB(); //connects express to mongodb

app.use('/api/user',userRouter)
app.use('/api/image',imageRouter)

app.get('/',(req,res)=>{
  res.send('Hello World');
})

app.listen(PORT,()=>console.log("Server running on port "+PORT));