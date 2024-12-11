import jwt from "jsonwebtoken";

export const generateToken = (userId, isAdmin) => {
    return jwt.sign(
        { _id: userId, isAdmin },
        process.env.JWT_SECRET, 
        { expiresIn: "7d" }
    );
};
