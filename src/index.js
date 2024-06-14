import express from "express";
import connectDB from "./db/db.js";
import dotenv from "dotenv";
import { app } from "./app.js";



dotenv.config({
    path:"./env"
});
connectDB()
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Server is running on port ${process.env.PORT}`)
    })
})
.catch((error)=>{
    console.log(`MongoDB fail error: `,error)
})