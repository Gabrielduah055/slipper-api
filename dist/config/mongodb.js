"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connetDB = async () => {
    try {
        const conn = await mongoose_1.default.connect(`${process.env.MONGODB_URI}slipper-api`);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }
    catch (error) {
        console.error("MongoDB connection error:", error);
    }
};
mongoose_1.default.connection.on("connected", () => {
    console.log("Admin Database connected successfully");
});
mongoose_1.default.connection.on("error", (error) => {
    console.error("Mongoose connection error:", error);
});
mongoose_1.default.connection.on("disconnected", () => {
    console.log("Mongoose disconnected from DB");
});
exports.default = connetDB;
//# sourceMappingURL=mongodb.js.map