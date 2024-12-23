import jwt from "jsonwebtoken";

export const generateToken = (userId,email,username) => {
    return jwt.sign(
        { _id: userId, email,username },
        process.env.JWT_SECRET, 
        { expiresIn: "7d" }
    );
};
