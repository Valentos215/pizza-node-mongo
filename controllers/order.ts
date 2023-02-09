import { IOrder } from "./../models/Order";
import { RequestWithBody } from "./../utils/types";
import { Order } from "../models/Order";
import { errorHandler } from "../utils/errorHandler";
import STATUS_CODES from "../config/statusCodes";
import { Response } from "express";

module.exports.create = async (req: RequestWithBody<IOrder>, res: Response) => {
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
  } catch (err: any) {
    errorHandler(res, err);
  }
};
