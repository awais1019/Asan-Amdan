import { generateToken } from "../../Config/authConfig.js";
import { comparePassword, hashPassword } from "../../Helpers/authHelpers.js";
import serviceProvider from "../../Models/serviceProviderModel.js";

export const serviceProviderRegisterController = async (req, res) => {
    try {
        const { email, password, firstName, lastName, username, phoneNumber, cnicPicture, location } = req.body;

        if (!email || !password || !firstName || !lastName || !username || !phoneNumber || !cnicPicture) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        const existingProvider = await serviceProvider.findOne({
            $or: [{ email }, { username }]
        });

        if (existingProvider) {
            return res.status(400).json({ success: false, message: "Email or username already exists." });
        }

        //   hashing password
        const hashedPassword = await hashPassword(password);

        // Creating new service provider
        const newServiceProvider = new serviceProvider({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            username,
            phoneNumber,
            cnicPicture,
            location,
            // ordersCompleted and overallEarnings will default to 0
        });

        await newServiceProvider.save();

        res.status(201).json({ success: true, message: "Service provider registered successfully!" });
    } catch (error) {
        console.error("Error in registering service provider:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const serviceProviderLoginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, msg: "All Fields Are Required" });
        }

        // const foundedUser = await User.findOne({
        //     $or: [{ email }, { username }],
        // });

        const foundedUser = await serviceProvider.findOne({
            $or: [{ email }, { username }],
        });

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
        }

        return res.status(200).json({ success: true, msg: "Logged In Successfully", token, data: userResponse });


    } catch (error) {
        console.log("error in login", error);
        return res.status(500).json({ success: false, msg: "Server Error" });
    }
}

export const getServiceProviderController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ success: false, message: "Service provider ID is required." });
        }

        const serviceProviderData = await serviceProvider.findById(id);

        // If the service provider is not found
        if (!serviceProviderData) {
            return res.status(404).json({ success: false, message: "Service provider not found." });
        }




        res.status(200).json({
            success: true,
            message: "Service provider details fetched successfully.",
            data: {
                email: serviceProviderData.email,
                firstName: serviceProviderData.firstName,
                lastName: serviceProviderData.lastName,
                username: serviceProviderData.username,
                phoneNumber: serviceProviderData.phoneNumber,
                location: serviceProviderData.location,
                ordersCompleted: serviceProviderData.ordersCompleted,
                overallEarnings: serviceProviderData.overallEarnings,
                cnicPicture: serviceProviderData.cnicPicture,
            }
        });

    } catch (error) {
        console.error("Error fetching service provider:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const updateServiceProvider = async (req, res) => {
    try {
        const serviceProviderId = req.user.id; 
        const { email, firstName, lastName, username, phoneNumber } = req.body;

        // Validating all required fields
        if (!firstName || !lastName || !username || !phoneNumber) {
            return res.status(400).json({ success: false, message: "all fields are required." });
        }

        // Check for unique email and username
        const existingProvider = await serviceProvider.findOne({
            $or: [{ email }, { username }],
            _id: { $ne: serviceProviderId },
        });

        if (existingProvider) {
            return res.status(400).json({ success: false, message: "Email or username already exists." });
        }

        // Update the service provider
        const updatedServiceProvider = await serviceProvider.findByIdAndUpdate(
            serviceProviderId,
            {
                firstName,
                lastName,
                username,
                phoneNumber,
            },
            { new: true }
        );

        if (!updatedServiceProvider) {
            return res.status(404).json({ success: false, message: "Service provider not found." });
        }

        res.status(200).json({
            success: true,
            message: "Profile updated successfully!",
            data: {
                email: updatedServiceProvider.email,
                firstName: updatedServiceProvider.firstName,
                lastName: updatedServiceProvider.lastName,
                username: updatedServiceProvider.username,
                phoneNumber: updatedServiceProvider.phoneNumber,
                location: updatedServiceProvider.location,
            },
        });
    } catch (error) {
        console.error("Error in updating service provider profile:", error);
        res.status(500).json({ success: false, message: "Server error." });
    }
}











