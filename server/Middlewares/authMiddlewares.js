import serviceProvider from "../Models/serviceProviderModel.js";
import jwt from "jsonwebtoken"
import User from "../Models/userModels.js";


// for service provider
export const authenticateServiceProvider = async (req, res, next) => {

    
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({
                success: false,
                msg: "No Token Provided"
            });
        }
        
        console.log("i am in service provider authentication Token",token)

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        const user = await serviceProvider.findById(req.user._id);
        if (!user) {
            return res.status(401).json({
                success: false,
                msg: "User Not Founded"
            });
        }
        next();


    } catch (error) {
        console.log("it is error when authenticating servie provider",error);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                msg: "Token has expired"
            });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                msg: "Invalid token"
            });
        } else {
            console.log("Error in authenticating user", error);
            return res.status(500).json({
                success: false,
                msg: "Internal server error"
            });
        }
    }
}

// for admin
export const checkAdmin=async(req,res,next)=>{
    try {
        const token = req.headers.authorization;
        console.log("this is token in admin checking", token);

        if (!token) {
            return res.status(401).json({
                success: false,
                msg: "No Token Provided"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        const user = await User.findById(req.user._id);
        if (!user || user.isAdmin===false) {
            return res.status(401).json({
                success: false,
                msg: "User Not Founded"
            });
        }
        next();


    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                msg: "Token has expired"
            });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                msg: "Invalid token"
            });
        } else {
            console.log("Error in authenticating user", error);
            return res.status(500).json({
                success: false,
                msg: "Internal server error"
            });
        }
    }
}

// for user

export const checkUser=async(req,res,next)=>{
    try {
        const token = req.headers.authorization;
        console.log("this is token in user checking", token);
        if (!token) {
            return res.status(401).json({
                success: false,
                msg: "No Token Provided"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(401).json({
                success: false,
                msg: "User Not Founded"
            });
        }
        next();


    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                msg: "Token has expired"
            });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                msg: "Invalid token"
            });
        } else {
            console.log("Error in authenticating user", error);
            return res.status(500).json({
                success: false,
                msg: "Internal server error"
            });
        }
    }
}
