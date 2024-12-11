import serviceProvider from "../Models/serviceProviderModel.js";
import jwt from "jsonwebtoken"
export const authenticateServiceProvider = async (req, res, next) => {

    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({
                success: false,
                msg: "No Token Provided"
            });
        }

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
