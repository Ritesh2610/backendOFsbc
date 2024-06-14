import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB=async()=>{
console.log("url,",process.env.MONGODB_URL)
    try{
        const connectionInstance =await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        console.log(`MongoDB Connected to : ${connectionInstance}`);
    }
    catch(error){
        console.log("ERROR", error)
        process.exit(1)
    }
}

export default connectDB;