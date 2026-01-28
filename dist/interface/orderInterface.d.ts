import { Document } from "mongoose";
import { ICustomer } from "./customerInterface";
import { IProduct } from "./productInterface";
export interface IDeliveryDetails {
    googleAddress: string;
    addressName: string;
    contactName: string;
    contactNumber: string;
    deliveryInstructions?: string;
    preferredDeliveryTime?: string;
    buildingAccessInfo?: string;
    isPrimaryAddress: boolean;
}
export interface IOrderItem {
    product: IProduct["_id"];
    quantity: number;
    price: number;
}
export interface IOrder extends Document {
    customer: ICustomer["_id"];
    products: IOrderItem[];
    totalAmount: number;
    status: "pending" | "confirmed" | "delivered" | "cancelled";
    deliveryDetails: IDeliveryDetails;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=orderInterface.d.ts.map