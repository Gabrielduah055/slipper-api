import mongoose from "mongoose";
import { IOrder } from "../interface/orderInterface";

const orderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        price: {
            type: Number,
            required: true
        }
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "delivered", "cancelled"],
        default: "pending"
    },
    deliveryDetails: {
        googleAddress: { type: String, required: true },
        addressName: { type: String, required: true },
        contactName: { type: String, required: true },
        contactNumber: { type: String, required: true },
        deliveryInstructions: { type: String },
        preferredDeliveryTime: { type: String },
        buildingAccessInfo: { type: String },
        isPrimaryAddress: { type: Boolean, default: false }
    }
}, { timestamps: true });

export default mongoose.model<IOrder>("Order", orderSchema);
