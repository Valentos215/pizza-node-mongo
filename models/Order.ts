import { Schema, model } from "mongoose";

export interface IOrder {
  date: Date;
  list: [
    {
      id: string;
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
      store?: string;
      street?: string;
      house?: number;
      apartment?: number;
      entrance?: number;
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

export const Order = model<IOrder>("orders", orderSchema);
