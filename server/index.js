import express from "express";
import dotenv from "dotenv";
const app = express();

dotenv.config();
const port=process.env.PORT;

// Setting Server
app.get('/',(req,res)=>{
    res.send("Server is Running :)");
})
app.listen(port,()=>{
    console.log(`Server is running on port http://localhost:${port}`);
})