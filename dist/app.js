"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const pizzas_1 = __importDefault(require("./routes/pizzas"));
const products_1 = __importDefault(require("./routes/products"));
const order_1 = __importDefault(require("./routes/order"));
const keys_1 = __importDefault(require("./config/keys"));
const app = (0, express_1.default)();
mongoose_1.default
    .set("strictQuery", false)
    .connect(keys_1.default.mongoURI || "")
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.log(error));
const jsonBodyMiddleware = express_1.default.json();
app.use((0, morgan_1.default)("dev"));
app.use(jsonBodyMiddleware);
app.use((0, cors_1.default)());
app.use("/api/pizzas", pizzas_1.default);
app.use("/api/products", products_1.default);
app.use("/api/order", order_1.default);
exports.default = app;
