const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const pizzasRoutes = require("./routes/pizzas");
const productsRoutes = require("./routes/products");
const orderRoutes = require("./routes/order");
const keys = require("./config/keys");
const app = express();

mongoose
  .set("strictQuery", false)
  .connect(keys.mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

const jsonBodyMiddleware = express.json();

app.use(morgan("dev"));
app.use(jsonBodyMiddleware);
app.use(cors());

app.use("/api/pizzas", pizzasRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/order", orderRoutes);

module.exports = app;
