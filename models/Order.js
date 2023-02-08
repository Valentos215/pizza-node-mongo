const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  list: [
    {
      id: { type: Number },
      quantity: { type: Number },
      specification: {
        size: { type: String },
        crust: { type: String },
        ingredients: [{ type: String }],
      },
    },
  ],
  customer: {
    name: { type: String },
    phone: { type: String },
    email: { type: String },
    adress: {
      city: { type: String },
      store: { type: String },
      street: { type: String },
      house: { type: String },
      apartment: { type: String },
      entrance: { type: String },
    },
  },
});

module.exports = mongoose.model("orders", orderSchema);
