"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pizza = void 0;
const mongoose_1 = require("mongoose");
const pizzaSchema = new mongoose_1.Schema({
    imgUrl: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    ingredients: [
        {
            type: String,
            required: true,
        },
    ],
    baseCost: {
        type: Number,
        required: true,
    },
    popularity: {
        type: Number,
        required: true,
    },
});
exports.Pizza = (0, mongoose_1.model)("pizzas", pizzaSchema);
