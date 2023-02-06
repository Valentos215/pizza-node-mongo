const Category = require("../models/Category");
const Position = require("../models/Position");
const errorHandler = require("../utils/errorHandler");

module.exports.getAll = async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user.id });
    res.status(200).json(categories);
  } catch (err) {
    errorHandler(res, err);
  }
};
module.exports.getById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.status(200).json(category);
  } catch (err) {
    errorHandler(res, err);
  }
};
module.exports.remove = async (req, res) => {
  try {
    await Category.remove({ _id: req.params.id });
    await Position.remove({ category: req.params.id });
    res.ststus(200).json({ message: "Category has been deleted" });
  } catch (err) {
    errorHandler(res, err);
  }
};
module.exports.create = async (req, res) => {
  const category = new Category({
    name: req.body.name,
    user: req.user.id,
    imageSrc: req.file ? req.file.path : "",
  });
  try {
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    errorHandler(res, err);
  }
};
module.exports.update = async (req, res) => {
  const updated = {
    name: req.body.name,
  };
  if (req.file) {
    updated.imageSrc = req.file.path;
  }
  try {
    const category = await Category.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updated },
      { new: true }
    );
    res.status(200).json(category);
  } catch (err) {
    errorHandler(res, err);
  }
};
