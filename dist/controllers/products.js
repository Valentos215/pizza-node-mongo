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
const errorHandler_1 = require("../utils/errorHandler");
const statusCodes_1 = __importDefault(require("../config/statusCodes"));
const Product_1 = require("../models/Product");
module.exports.getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.productType) {
        res
            .status(statusCodes_1.default.NOT_FOUND_404)
            .json({ message: "Product type not specified" });
        return;
    }
    try {
        const products = yield Product_1.Product.find({ type: req.params.productType });
        res.status(statusCodes_1.default.OK_200).json(products);
    }
    catch (err) {
        (0, errorHandler_1.errorHandler)(res, err);
    }
});
module.exports.create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.adminKey || req.body.adminKey !== process.env.ADMIN_KEY) {
        res
            .status(statusCodes_1.default.UNATHORIZED_401)
            .json({ message: "No access rights" });
        return;
    }
    if (!req.params.productType) {
        res
            .status(statusCodes_1.default.NOT_FOUND_404)
            .json({ message: "Product type not specified" });
        return;
    }
    const { imgUrl, title, category, cost, size } = req.body;
    if (!imgUrl || !title || !cost || !size) {
        res
            .status(statusCodes_1.default.BAD_REQUEST_400)
            .json({ message: "imgUrl, title, cost or size not specified" });
        return;
    }
    const product = new Product_1.Product({
        type: req.params.productType,
        imgUrl,
        title,
        category,
        cost,
        size,
    });
    try {
        yield product.save();
        res.status(statusCodes_1.default.CREATED_201).json(product);
    }
    catch (err) {
        (0, errorHandler_1.errorHandler)(res, err);
    }
});
module.exports.update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.adminKey || req.body.adminKey !== process.env.ADMIN_KEY) {
        res
            .status(statusCodes_1.default.UNATHORIZED_401)
            .json({ message: "No access rights" });
        return;
    }
    if (!req.params.id) {
        res
            .status(statusCodes_1.default.NOT_FOUND_404)
            .json({ message: "Product id not specified" });
        return;
    }
    try {
        const product = yield Product_1.Product.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true });
        res.status(200).json(product);
    }
    catch (err) {
        (0, errorHandler_1.errorHandler)(res, err);
    }
});
module.exports.remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.adminKey || req.body.adminKey !== process.env.ADMIN_KEY) {
        res
            .status(statusCodes_1.default.UNATHORIZED_401)
            .json({ message: "No access rights" });
        return;
    }
    if (!req.params.id) {
        res
            .status(statusCodes_1.default.NOT_FOUND_404)
            .json({ message: "Product id not specified" });
        return;
    }
    try {
        yield Product_1.Product.remove({ _id: req.params.id });
        res
            .status(statusCodes_1.default.OK_200)
            .json({ message: "Product has been removed" });
    }
    catch (err) {
        (0, errorHandler_1.errorHandler)(res, err);
    }
});
