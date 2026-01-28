import mongoose from "mongoose";
import { ICustomer } from "../interface/customerInterface";

const customerSchema = new mongoose.Schema({
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

export default mongoose.model<ICustomer>("Customer", customerSchema);
