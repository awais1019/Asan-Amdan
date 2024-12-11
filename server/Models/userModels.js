import mongoose from "mongoose";

const userSchema =  mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        // default: null,
        required:true,
        trim: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        // default: null,
        trim: true,
    },
    location: {
        type: String,
        default: null, 
        trim: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
    
}, {
    timestamps: true, 
});

const User = mongoose.model("User", userSchema);

export default User;