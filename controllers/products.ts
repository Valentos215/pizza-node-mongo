import { errorHandler } from "../utils/errorHandler";
import STATUS_CODES from "../config/statusCodes";

import { Response } from "express";
import { RequestWithParams, RequestWithParamsAndBody } from "./../utils/types";
import { Product, IProduct } from "../models/Product";

interface IAdminReq {
  adminKey: string;
}

interface IAdminProductReq extends IProduct, IAdminReq {}

interface IReqParams {
  id: string;
  productType: string;
}

module.exports.getAll = async (
  req: RequestWithParams<IReqParams>,
  res: Response
) => {
  if (!req.params.productType) {
    res
      .status(STATUS_CODES.NOT_FOUND_404)
      .json({ message: "Product type not specified" });
    return;
  }
  try {
    const products = await Product.find({ type: req.params.productType });
    res.status(STATUS_CODES.OK_200).json(products);
  } catch (err: any) {
    errorHandler(res, err);
  }
};
module.exports.create = async (
  req: RequestWithParamsAndBody<IReqParams, IAdminProductReq>,
  res: Response
) => {
  if (!req.body.adminKey || req.body.adminKey !== process.env.ADMIN_KEY) {
    res
      .status(STATUS_CODES.UNATHORIZED_401)
      .json({ message: "No access rights" });
    return;
  }
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
  } catch (err: any) {
    errorHandler(res, err);
  }
};
module.exports.update = async (
  req: RequestWithParamsAndBody<IReqParams, IAdminProductReq>,
  res: Response
) => {
  if (!req.body.adminKey || req.body.adminKey !== process.env.ADMIN_KEY) {
    res
      .status(STATUS_CODES.UNATHORIZED_401)
      .json({ message: "No access rights" });
    return;
  }
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
  } catch (err: any) {
    errorHandler(res, err);
  }
};
module.exports.remove = async (
  req: RequestWithParamsAndBody<IReqParams, IAdminReq>,
  res: Response
) => {
  if (!req.body.adminKey || req.body.adminKey !== process.env.ADMIN_KEY) {
    res
      .status(STATUS_CODES.UNATHORIZED_401)
      .json({ message: "No access rights" });
    return;
  }
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
  } catch (err: any) {
    errorHandler(res, err);
  }
};
