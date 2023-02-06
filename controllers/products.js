import STATUS_CODES from "../config/statusCodes";
const Product = require("../models/Product");
const errorHandler = require("../utils/errorHandler");

module.exports.getAll = async (req, res) => {
  if (!req.params.productType) {
    res
      .status(STATUS_CODES.NOT_FOUND_404)
      .json({ message: "Product type not specified" });
    return;
  }
  try {
    const products = await Product.find({ type: req.params.productType });
    res.status(STATUS_CODES.OK_200).json(products);
  } catch (err) {
    errorHandler(res, err);
  }
};
module.exports.create = async (req, res) => {
  if (!req.params.productType) {
    res
      .status(STATUS_CODES.NOT_FOUND_404)
      .json({ message: "Product type not specified" });
    return;
  }
  const { imgUrl, title, category, cost, size } = req.body;
  if (!imgUrl || !title || !cost || !size) {
    res
      .status(STATUS_CODES.BAD_REQUEST_400)
      .json({ message: "imgUrl, title, cost or size not specified" });
    return;
  }
  const product = new Product({
    type: req.params.productType,
    imgUrl,
    title,
    category,
    cost,
    size,
  });
  try {
    await product.save();
    res.status(STATUS_CODES.CREATED_201).json(product);
  } catch (err) {
    errorHandler(res, err);
  }
};
module.exports.update = async (req, res) => {
  if (!req.params.id) {
    res
      .status(STATUS_CODES.NOT_FOUND_404)
      .json({ message: "Product id not specified" });
    return;
  }
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(product);
  } catch (err) {
    errorHandler(res, err);
  }
};
module.exports.remove = async (req, res) => {
  if (!req.params.id) {
    res
      .status(STATUS_CODES.NOT_FOUND_404)
      .json({ message: "Product id not specified" });
    return;
  }
  try {
    await Product.remove({ _id: req.params.id });
    res
      .status(STATUS_CODES.OK_200)
      .json({ message: "Product has been removed" });
  } catch (err) {
    errorHandler(res, err);
  }
};
