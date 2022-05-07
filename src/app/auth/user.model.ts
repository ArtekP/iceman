import { Order } from "../order-client/order.model";

export interface User {
  name: string;
  email: string;
  password: string;
  role: string;
  favourites: string[];
  order: Order[];
}
