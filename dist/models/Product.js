"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    type: {
        type: String,
        required: true,
    },
    imgUrl: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: false,
    },
    cost: [
        {
            type: Number,
            required: true,
        },
    ],
    size: [
        {
            type: String,
            required: true,
        },
    ],
});
exports.Product = (0, mongoose_1.model)("products", productSchema);
