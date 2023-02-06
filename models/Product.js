const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const positionSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: false,
  },
  cost: [
    {
      type: Number,
      required: true,
    },
  ],
  size: [
    {
      type: String,
      required: true,
    },
  ],
});

module.exports = mongoose.model("products", positionSchema);
