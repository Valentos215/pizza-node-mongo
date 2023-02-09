"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const statusCodes_1 = __importDefault(require("../config/statusCodes"));
const errorHandler = (res, err) => {
    res.status(statusCodes_1.default.SERVER_ERROR_500).json({
        success: false,
        message: err.message ? err.message : err,
    });
};
exports.errorHandler = errorHandler;
