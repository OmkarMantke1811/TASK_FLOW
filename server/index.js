import express from 'express'
import userRouter from './routes/userRouter.js'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

dotenv.config()

const app=express()

//cors
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,}
))

app.use(cookieParser())

//middelware to parse json data
app.use(express.json())

//user router                                   
app.use('/api/v1/user',userRouter)


//test route
app.get('/',(req,res)=>{
    res.send('Hello')
})

app.listen(5000,()=>{
    connectDB()
    console.log('server running on portal 5000')
})