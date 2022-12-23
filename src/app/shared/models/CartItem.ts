import { Food } from "./Food";

export class CartItem {
  constructor( public food: Food) {}
  quantity: number = 1;
  // tax: number = 0;
  price: number = this.food.price;
}
