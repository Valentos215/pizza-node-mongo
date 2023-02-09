"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Order_1 = require("../models/Order");
const errorHandler_1 = require("../utils/errorHandler");
const statusCodes_1 = __importDefault(require("../config/statusCodes"));
module.exports.create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, phone, email, adress } = req.body.customer;
        if (!name || !phone || !email || !adress) {
            res.status(statusCodes_1.default.BAD_REQUEST_400).json({
                message: "name, phone, email or adress not specified",
            });
            return;
        }
        if (!req.body.list) {
            res.status(statusCodes_1.default.BAD_REQUEST_400).json({
                message: "Shopping list is empty",
            });
            return;
        }
        const order = yield new Order_1.Order({
            list: req.body.list,
            customer: { name, phone, email, adress },
        }).save();
        res.status(201).json(order);
    }
    catch (err) {
        (0, errorHandler_1.errorHandler)(res, err);
    }
});
