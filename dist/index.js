"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const mongodb_1 = __importDefault(require("./config/mongodb"));
const adminRouter_1 = __importDefault(require("./route/adminRouter"));
const productRouter_1 = __importDefault(require("./route/productRouter"));
const orderRouter_1 = __importDefault(require("./route/orderRouter"));
const customerRouter_1 = __importDefault(require("./route/customerRouter"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
(0, mongodb_1.default)();
const uploadDir = path_1.default.join(process.cwd(), 'uploads');
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir);
}
app.use(express_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({ limit: "10mb", extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({ credentials: true }));
app.use('/uploads', express_1.default.static(uploadDir));
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use("/api/admin", adminRouter_1.default);
app.use("/api/product", productRouter_1.default);
app.use("/api/orders", orderRouter_1.default);
app.use("/api/customers", customerRouter_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//# sourceMappingURL=index.js.map