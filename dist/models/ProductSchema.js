"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const PRODUCT_CATEGORIES = ["Half Shoe", "Sandal", "Slippers", "Shoe", "Sneaker", "Others"];
const productSchema = new mongoose_1.default.Schema({
    category: {
        type: String,
        enum: PRODUCT_CATEGORIES,
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
    productThumbnailImages: {
        type: [String],
        required: true,
        trim: true,
        min: 1
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
    productSize: {
        type: Number,
        required: true,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model("Product", productSchema);
//# sourceMappingURL=ProductSchema.js.map