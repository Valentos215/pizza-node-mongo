import { Schema, model } from "mongoose";

export interface IOrder {
  date: Date;
  list: [
    {
      id: number;
      quantity: number;
      specification: {
        size: string;
        crust?: string;
        ingredients?: string[];
      };
    }
  ];
  customer: {
    name: string;
    phone: string;
    email: string;
    adress: {
      city: string;
      store: string;
      street: string;
      house: number;
      apartment: number;
      entrance: number;
    };
  };
}

const orderSchema = new Schema({
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

export const Order = model<IOrder>("orders", orderSchema);
