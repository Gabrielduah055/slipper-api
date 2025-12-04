import { Document } from "mongoose";

export interface IProduct extends Document {
    category: string;
    productName: string;
    productPrice: number;
    productImage: string;
    productThumnailImages: string[];
    productStock: number;
    productDescription: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}