import { Request, Response, RequestHandler } from "express";
import Order from "../models/OrderSchema";
import Customer from "../models/CustomerSchema";
import Product from "../models/ProductSchema";
import { IOrderItem } from "../interface/orderInterface";

// Create Order
export const createOrder: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { 
        name, 
        email, 
        whatsappNumber,
        products, 
        deliveryDetails 
    } = req.body;

    // 1. Find or Create Customer
    let customer = await Customer.findOne({ email });

    if (customer) {
        // Update customer details if they changed
        customer.name = name;
        customer.whatsappNumber = whatsappNumber;
        await customer.save();
    } else {
        customer = await Customer.create({
            name,
            email,
            whatsappNumber
        });
    }

    // 2. Validate Products and Calculate Total
    let totalAmount = 0;
    const orderItems: IOrderItem[] = [];

    for (const item of products) {
        const product = await Product.findById(item.productId);
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
    const order = await Order.create({
        customer: customer._id,
        products: orderItems,
        totalAmount,
        deliveryDetails
    });

    res.status(201).json({
        message: "Order created successfully",
        order
    });

  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Failed to create order" });
  }
};

// Get All Orders
export const getAllOrders: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const orders = await Order.find()
        .populate('customer')
        .populate('products.product')
        .sort({ createdAt: -1 });
        
    res.status(200).json({
      message: "Orders fetched successfully",
      orders,
    });
  } catch (error) {
    console.error("Error getting orders:", error);
    res.status(500).json({ message: "Failed to get orders" });
  }
};
