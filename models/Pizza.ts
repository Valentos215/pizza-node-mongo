import { Schema, model } from "mongoose";

export interface IPizza {
  imgUrl: string;
  title: string;
  description: string;
  ingredients: string[];
  baseCost: number;
  popularity: number;
}

const pizzaSchema = new Schema({
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

export const Pizza = model<IPizza>("pizzas", pizzaSchema);
