import { Request, Response, RequestHandler } from "express";
import Customer from "../models/CustomerSchema";

// Get all customers
export const getAllCustomers: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.status(200).json({
      message: "Customers fetched successfully Weldone Gabriel",
      customers,
    });
  } catch (error) {
    console.error("Error getting customers:", error);
    res.status(500).json({ message: "Failed to get customers" });
  }
};
