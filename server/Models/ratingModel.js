import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
    serviceProviderId: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceProvider', required: true },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Orders' },
    rating: { type: Number, required: true, min: 1, max: 5 },
    feedback: { type: String },
});

const Rating = mongoose.model('serviceProviderRating', ratingSchema);
export default Rating;
