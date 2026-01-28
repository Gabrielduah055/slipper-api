"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const customerSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    whatsappNumber: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model("Customer", customerSchema);
//# sourceMappingURL=CustomerSchema.js.map