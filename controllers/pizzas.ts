import { errorHandler } from "../utils/errorHandler";
import STATUS_CODES from "../config/statusCodes";

import { Request, Response } from "express";
import { RequestWithBody, RequestWithParamsAndBody } from "./../utils/types";
import { Pizza, IPizza } from "../models/Pizza";

interface IAdminReq {
  adminKey: string;
}

interface IAdminPizzaReq extends IPizza, IAdminReq {}

interface IReqParams {
  id: string;
}

module.exports.getAll = async (req: Request, res: Response) => {
  try {
    const pizzas: IPizza[] = await Pizza.find();
    res.status(STATUS_CODES.OK_200).json(pizzas);
  } catch (err: any) {
    errorHandler(res, err);
  }
};

module.exports.create = async (
  req: RequestWithBody<IAdminPizzaReq>,
  res: Response
) => {
  if (!req.body.adminKey || req.body.adminKey !== process.env.ADMIN_KEY) {
    res
      .status(STATUS_CODES.UNATHORIZED_401)
      .json({ message: "No access rights" });
    return;
  }
  const { imgUrl, title, description, ingredients, baseCost, popularity } =
    req.body;
  if (!imgUrl || !title || !ingredients || !baseCost || !popularity) {
    res.status(STATUS_CODES.BAD_REQUEST_400).json({
      message:
        "imgUrl, title, ingredients, baseCost or popularity not specified",
    });
    return;
  }
  const pizza = new Pizza({
    imgUrl,
    title,
    description,
    ingredients,
    baseCost,
    popularity,
  });
  try {
    await pizza.save();
    res.status(STATUS_CODES.CREATED_201).json(pizza);
  } catch (err: any) {
    errorHandler(res, err);
  }
};

module.exports.update = async (
  req: RequestWithParamsAndBody<IReqParams, IAdminPizzaReq>,
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
      .json({ message: "Pizza id not specified" });
    return;
  }
  try {
    await Pizza.remove({ _id: req.params.id });
    res.status(STATUS_CODES.OK_200).json({ message: "Pizza has been removed" });
  } catch (err: any) {
    errorHandler(res, err);
  }
};
