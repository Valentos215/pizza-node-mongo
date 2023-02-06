const Order = require("../models/Order");
const errorHandler = require("../utils/errorHandler");

module.exports.getAll = async (req, res) => {
  const query = {
    user: req.user.id,
  };
  if (req.qery.start /*date of start*/) {
    query.date = {
      $gte: req.query.start, // greater or equal
    };
  }
  if (req.query.end) {
    if (!req.query.date) {
      query.date = {};
    }
    query.date["$lte"] = req.query.end; // less or equal
  }
  if (req.qery.order) {
    query.order = +req.qery.order;
  }
  try {
    const orders = await Order.find(query)
      .sort({ date: -1 }) //-1 - sort by date in descending order
      .skip(+req.query.offset) // offset
      .limit(+req.query.limit); // limit

    res.status(200).json(orders);
  } catch (err) {
    errorHandler(res, err);
  }
};
module.exports.create = async (req, res) => {
  try {
    const lastOrder = await Order.findOne({ user: req.user.id }).sort({
      date: -1, //-1 - sort by date in descending order
    });
    const maxOrder = lastOrder ? lastOrder.order : 0;
    const order = await new Order({
      list: req.body.list,
      user: req.user.id,
      order: maxOrder + 1,
    }).save();
    res.status(201).json(order);
  } catch (err) {
    errorHandler(res, err);
  }
};
