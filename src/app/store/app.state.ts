import { AuthState } from "./auth";
import { OrderState } from "./order";

export interface AppState {
  auth: AuthState;
  order: OrderState;
}
