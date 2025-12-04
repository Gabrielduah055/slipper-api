import mongoose from "mongoose";

import { IProduct } from "../interface/productInterface";

const productSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        trim: true
    },
    productName: {
        type: String,
        required: true,
        trim: true
    },
    productPrice: {
        type: Number,
        required: true,
        trim: true
    },
    productImage: {
        type: String,
        required: true,
        trim: true
    },
    productThumnailImages: {
        type: [String],
        required: true,
        trim: true,
        min:0
    },
    productStock: {
        type: Number,
        required: true,
        trim: true
    },
    productDescription: {
        type: String,
        required: true,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

export default mongoose.model<IProduct>("Product", productSchema);