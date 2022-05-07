import {
  createReducer,
  on
} from "@ngrx/store";
import {
  OrderState
} from "./order.state";
import {
  OrderActions
} from "./order.actions";

const initialState: OrderState = {
  hasOrderedToday: false,
  hasEverOrdered: false,
}

export const orderReducer = createReducer(initialState,
    on(OrderActions.setHasOrderedTodayFalse, (state) => {
      return {
        ...state,
        hasOrderedToday: false
      }
    }),
    on(OrderActions.setHasOrderedTodayTrue, (state) => {
      return {
        ...state,
        hasOrderedToday: true
      }
    }),
    on(OrderActions.setHasEverOrderedFalse, (state) => {
        return {
          ...state,
          hasEverOrdered: false
        }
      }),
      on(OrderActions.setHasEverOrderedTrue, (state) => {
        return {
          ...state,
          hasEverOrdered: true
        }
      })
)