"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    date: {
        type: Date,
        default: Date.now,
    },
    list: [
        {
            id: { type: String, required: true },
            quantity: { type: Number, required: true },
            specification: {
                size: { type: String, required: true },
                crust: { type: String, required: false },
                ingredients: [{ type: String, required: false }],
            },
        },
    ],
    customer: {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String, required: true },
        adress: {
            city: { type: String, required: true },
            store: { type: String, required: false },
            street: { type: String, required: false },
            house: { type: Number, required: false },
            apartment: { type: Number, required: false },
            entrance: { type: Number, required: false },
        },
    },
});
exports.Order = (0, mongoose_1.model)("orders", orderSchema);
