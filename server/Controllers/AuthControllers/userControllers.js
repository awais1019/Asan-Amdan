import { generateToken } from "../../Config/authConfig.js";
import { comparePassword, hashPassword } from "../../Helpers/authHelpers.js";
import User from "../../Models/userModels.js";

export const registerController = async (req, res) => {

    try {
        const { email, password, firstName, lastName, userName, phoneNumber, location } = req.body;

        if (!email || !password || !firstName || !lastName || !userName || !phoneNumber) {
            return res.status(400).json({ success: false, msg: "All Fields Are Required" });
        }
        // checking if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({ success: false, msg: "User Already Exists" });
        }

        const hashedPassword = await hashPassword(password);

        // creating new user
        let isAdmin = false;
        if (email === "abrar@gmail.com") {
            isAdmin = true;
        }
        const newUser = new User({ email, password: hashedPassword, firstName, lastName, userName, phoneNumber, location, isAdmin });
        await newUser.save();

        const userResponse = { email, firstName, lastName, userName, isAdmin };
        return res.status(201).json({ success: true, msg: "User Created Successfully", data: userResponse });

    } catch (error) {
        console.log("error in registering user", error);
        return res.status(500).json({ success: false, msg: "Server Error" });
    }
}


export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, msg: "All Fields Are Required" });
        }

        // const foundedUser = await User.findOne({
        //     $or: [{ email }, { username }],
        // });

        const foundedUser=await User.findOne({email});

        if (!foundedUser) {
            return res.status(401).json({ success: false, msg: "Invalid Email or Password" });
        }
        const isMatch = await comparePassword(password, foundedUser.password);

        if (!isMatch) {
            return res.status(401).json({ success: false, msg: "Invalid Credentials" });
        }

        const token = generateToken(foundedUser._id, foundedUser.isAdmin);

        const userResponse = {
            email: foundedUser.email,
            firstName: foundedUser.firstName,
            lastName: foundedUser.lastName,
            userName: foundedUser.userName,
            isAdmin: foundedUser.isAdmin
        }

        return res.status(200).json({ success: true, msg: "Logged In Successfully", token, data: userResponse });


    } catch (error) {
        console.log("error in login", error);
        return res.status(500).json({ success: false, msg: "Server Error" });
    }
}





