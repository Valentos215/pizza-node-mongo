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
            id: { type: Number },
            quantity: { type: Number },
            specification: {
                size: { type: String },
                crust: { type: String },
                ingredients: [{ type: String }],
            },
        },
    ],
    customer: {
        name: { type: String },
        phone: { type: String },
        email: { type: String },
        adress: {
            city: { type: String },
            store: { type: String },
            street: { type: String },
            house: { type: Number },
            apartment: { type: Number },
            entrance: { type: Number },
        },
    },
});
exports.Order = (0, mongoose_1.model)("orders", orderSchema);
