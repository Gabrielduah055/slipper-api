"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    customer: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Customer",
        required: true
    },
    products: [{
            product: {
                type: mongoose_1.default.Schema.Types.ObjectId,
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
exports.default = mongoose_1.default.model("Order", orderSchema);
//# sourceMappingURL=OrderSchema.js.map