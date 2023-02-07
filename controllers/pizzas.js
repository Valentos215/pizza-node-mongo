const STATUS_CODES = require("../config/statusCodes");
const Pizza = require("../models/Pizza");
const errorHandler = require("../utils/errorHandler");

module.exports.getAll = async (req, res) => {
  try {
    const pizzas = await Pizza.find();
    res.status(STATUS_CODES.OK_200).json(pizzas);
  } catch (err) {
    errorHandler(res, err);
  }
};
module.exports.create = async (req, res) => {
  const { imgUrl, title, description, ingredients, baseCost, popularity } =
    req.body;
  if (!imgUrl || !title || !ingredients || !baseCost || !popularity) {
    res.status(STATUS_CODES.BAD_REQUEST_400).json({
      message:
        "imgUrl, title, ingredients, baseCost or popularity not specified",
    });
    return;
  }
  const product = new Product({
    imgUrl,
    title,
    description,
    ingredients,
    baseCost,
    popularity,
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
      .json({ message: "Pizza id not specified" });
    return;
  }
  try {
    const pizza = await Pizza.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(pizza);
  } catch (err) {
    errorHandler(res, err);
  }
};
module.exports.remove = async (req, res) => {
  if (!req.params.id) {
    res
      .status(STATUS_CODES.NOT_FOUND_404)
      .json({ message: "Pizza id not specified" });
    return;
  }
  try {
    await Pizza.remove({ _id: req.params.id });
    res.status(STATUS_CODES.OK_200).json({ message: "Pizza has been removed" });
  } catch (err) {
    errorHandler(res, err);
  }
};
