"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllOrders = exports.createOrder = void 0;
const OrderSchema_1 = __importDefault(require("../models/OrderSchema"));
const CustomerSchema_1 = __importDefault(require("../models/CustomerSchema"));
const ProductSchema_1 = __importDefault(require("../models/ProductSchema"));
// Create Order
const createOrder = async (req, res) => {
    try {
        const { name, email, whatsappNumber, products, deliveryDetails } = req.body;
        // 1. Find or Create Customer
        let customer = await CustomerSchema_1.default.findOne({ email });
        if (customer) {
            // Update customer details if they changed
            customer.name = name;
            customer.whatsappNumber = whatsappNumber;
            await customer.save();
        }
        else {
            customer = await CustomerSchema_1.default.create({
                name,
                email,
                whatsappNumber
            });
        }
        // 2. Validate Products and Calculate Total
        let totalAmount = 0;
        const orderItems = [];
        for (const item of products) {
            const product = await ProductSchema_1.default.findById(item.productId);
            if (!product) {
                res.status(404).json({ message: `Product not found: ${item.productId}` });
                return;
            }
            if (product.productStock < item.quantity) {
                res.status(400).json({ message: `Insufficient stock for product: ${product.productName}` });
                return;
            }
            // Update Stock
            product.productStock -= item.quantity;
            await product.save();
            orderItems.push({
                product: product._id,
                quantity: item.quantity,
                price: product.productPrice
            });
            totalAmount += product.productPrice * item.quantity;
        }
        // 3. Create Order
        const order = await OrderSchema_1.default.create({
            customer: customer._id,
            products: orderItems,
            totalAmount,
            deliveryDetails
        });
        res.status(201).json({
            message: "Order created successfully",
            order
        });
    }
    catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "Failed to create order" });
    }
};
exports.createOrder = createOrder;
// Get All Orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await OrderSchema_1.default.find()
            .populate('customer')
            .populate('products.product')
            .sort({ createdAt: -1 });
        res.status(200).json({
            message: "Orders fetched successfully",
            orders,
        });
    }
    catch (error) {
        console.error("Error getting orders:", error);
        res.status(500).json({ message: "Failed to get orders" });
    }
};
exports.getAllOrders = getAllOrders;
//# sourceMappingURL=orderController.js.map