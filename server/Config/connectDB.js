
import mongoose from "mongoose";
export const connectDB=async()=>{
    try{
        const connection =mongoose.connect(process.env.db_Url)
        console.log("DB connect successfully");
    }
    catch(error){
        console.log("errror while connecting db",error);
    }
}