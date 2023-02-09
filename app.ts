import express from "express";
import mongoose, { Error } from "mongoose";
import cors from "cors";
import morgan from "morgan";
import pizzasRoutes from "./routes/pizzas";
import productsRoutes from "./routes/products";
import orderRoutes from "./routes/order";
import keys from "./config/keys";
const app = express();

mongoose
  .set("strictQuery", false)
  .connect(keys.mongoURI || "")
  .then(() => console.log("MongoDB connected"))
  .catch((error: Error) => console.log(error));

const jsonBodyMiddleware = express.json();

app.use(morgan("dev"));
app.use(jsonBodyMiddleware);
app.use(cors());

app.use("/api/pizzas", pizzasRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/order", orderRoutes);

export default app;
