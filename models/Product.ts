import { Schema, model } from "mongoose";

export interface IProduct {
  type: string;
  imgUrl: string;
  title: string;
  category: string;
  cost: number[];
  size: string[];
}

const productSchema = new Schema({
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

export const Product = model<IProduct>("products", productSchema);
