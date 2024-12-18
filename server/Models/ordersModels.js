import mongoose from "mongoose";

const ordersSchema = mongoose.Schema({

    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    serviceProviderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    gigId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Gig",
        required: true,
    },
    orderDetails: {
        title: {
            type: String,
            required: true,
        },
        description: {      // any extra description provided by client.
            type: String,
            required: false
        },        
        price: {
            type: Number,
            required: true,
            min:0
        },
        delivery_time: {
            type: String,
            required: true,
        }
    },
    orderStatus: {
        type: String,
        required: true,
        enum: ["pending", "in-progress", "completed", "cancelled"],
        default: "pending",
    },
    payment_status: {
        type:String,
        enum:["pending","paid"],
        default:"pending"
    },
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Categories",
        required:true,
    },
    isTechnical:{
        type:Boolean,
        required:true,
    }
},{timestamps:true,})


const Orders = mongoose.model("Orders", ordersSchema);
export default Orders;




