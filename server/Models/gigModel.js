import mongoose from "mongoose";

const gigSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 100,
        },
        description: {
            type: String,
            required: true,
            minlength: 10,
            maxlength: 500,
        },
        experience: {
            type: Number,
            required: true,
            min: 0,
            max: 50,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        availabilityHours: {
            type: String,
            required: true,
            match: /^[0-9]{1,2}:[0-9]{2} - [0-9]{1,2}:[0-9]{2}$/, // format "HH:MM - HH:MM"
        },
        location: {
            type: String,
            //   required: true,
            trim: true,
        },
        image: {
            type: String,
            required: true,
        },
        video: {
            type: String,
            default: null,
        },
        document: {
            type: String,
            default: null,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Categories",
            required: true,
        },
        status: {
            type: String,
            default: "pending",
            //   enum: ["pending", "approved", "rejected"], 
        },
        serviceProviderId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const Gig = mongoose.model("Gig", gigSchema);
export default Gig;


// Gig
//     Title
//     Description
//     Experience
//     Price
//     Availability Hours
//     Location
//     Image
//     Video  optional
//     document optional
//     category
//     status default pending