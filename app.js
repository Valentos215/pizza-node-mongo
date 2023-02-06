const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const morgan = require("morgan");
const analyticsRoutes = require("./routes/analytics");
const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/category");
const orderRoutes = require("./routes/order");
const positionRoutes = require("./routes/position");
const keys = require("./config/keys");
const app = express();

mongoose
  .set("strictQuery", false)
  .connect(keys.mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

const jsonBodyMiddleware = express.json();

app.use(passport.initialize());
require("./middleware/passport")(passport);
app.use("/uploads", express.static("uploads"));
app.use(morgan("dev"));
app.use(jsonBodyMiddleware);
app.use(cors());

app.use("/api/analytics", analyticsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/position", positionRoutes);

module.exports = app;
