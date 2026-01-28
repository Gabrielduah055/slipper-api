"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCustomers = void 0;
const CustomerSchema_1 = __importDefault(require("../models/CustomerSchema"));
// Get all customers
const getAllCustomers = async (req, res) => {
    try {
        const customers = await CustomerSchema_1.default.find().sort({ createdAt: -1 });
        res.status(200).json({
            message: "Customers fetched successfully Weldone Gabriel",
            customers,
        });
    }
    catch (error) {
        console.error("Error getting customers:", error);
        res.status(500).json({ message: "Failed to get customers" });
    }
};
exports.getAllCustomers = getAllCustomers;
//# sourceMappingURL=customerController.js.map