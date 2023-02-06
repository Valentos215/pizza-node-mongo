const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  imgUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  ingredients: {
    type: String,
    required: true,
  },
  baseCost: {
    type: Number,
    required: true,
  },
  popularity: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("pizzas", userSchema);
