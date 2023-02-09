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
const Pizza_1 = require("../models/Pizza");
module.exports.getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pizzas = yield Pizza_1.Pizza.find();
        res.status(statusCodes_1.default.OK_200).json(pizzas);
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
    const { imgUrl, title, description, ingredients, baseCost, popularity } = req.body;
    if (!imgUrl || !title || !ingredients || !baseCost || !popularity) {
        res.status(statusCodes_1.default.BAD_REQUEST_400).json({
            message: "imgUrl, title, ingredients, baseCost or popularity not specified",
        });
        return;
    }
    const pizza = new Pizza_1.Pizza({
        imgUrl,
        title,
        description,
        ingredients,
        baseCost,
        popularity,
    });
    try {
        yield pizza.save();
        res.status(statusCodes_1.default.CREATED_201).json(pizza);
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
            .json({ message: "Pizza id not specified" });
        return;
    }
    try {
        const pizza = yield Pizza_1.Pizza.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true });
        res.status(200).json(pizza);
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
            .json({ message: "Pizza id not specified" });
        return;
    }
    try {
        yield Pizza_1.Pizza.remove({ _id: req.params.id });
        res.status(statusCodes_1.default.OK_200).json({ message: "Pizza has been removed" });
    }
    catch (err) {
        (0, errorHandler_1.errorHandler)(res, err);
    }
});
