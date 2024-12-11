import express from "express";
import dotenv from "dotenv";
import cors from "cors";
const app = express();


// importing api routes
import authRoutes from "./Routes/AuthRoutes/userRoutes.js";
import serviceProviderRoutes from "./Routes/AuthRoutes/serviceProviderRoutes.js";
import gigRoutes from "./Routes/GigRoutes/gigRoutes.js"


// importing db connection function
import { connectDB } from "./Config/connectDB.js";

//converting json data to js object form 
app.use(express.json());

// configuring env file
dotenv.config();
const port=process.env.PORT;

//connecting databases
connectDB();

// configuring cors
const corsConfig={
    origin:"*",
    credentials:true,
    methods:["GET","POST","PUT","DELETE"]
  };
  app.options("",cors(corsConfig));
  app.use(cors(corsConfig))




//All Api Routes

// Authentication routes
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/auth",serviceProviderRoutes);
app.use("/api/v1/gig",gigRoutes)



// Setting Server
app.get('/',(req,res)=>{
    res.send("Running Server");
})
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})