const Order = require("../models/Order");
const errorHandler = require("../utils/errorHandler");

module.exports.create = async (req, res) => {
  try {
    const { name, phone, email, adress } = req.body.customer;
    if (!name || !phone || !email || !adress) {
      res.status(STATUS_CODES.BAD_REQUEST_400).json({
        message: "name, phone, email or adress not specified",
      });
      return;
    }
    if (!req.body.list) {
      res.status(STATUS_CODES.BAD_REQUEST_400).json({
        message: "Shopping list is empty",
      });
      return;
    }

    const order = await new Order({
      list: req.body.list,
      customer: { name, phone, email, adress },
    }).save();
    res.status(201).json(order);
  } catch (err) {
    errorHandler(res, err);
  }
};
