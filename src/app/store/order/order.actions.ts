import { createAction } from "@ngrx/store";

export const OrderActions = {
    setHasOrderedTodayTrue: createAction('[Order] Set has ordered today on TRUE'),
    setHasOrderedTodayFalse: createAction('[Order] Set has ordered today on FALSE'),
    setHasEverOrderedTrue: createAction('[Order] Set has ever ordered on TRUE'),
    setHasEverOrderedFalse: createAction('[Order] Set has ever ordered on FALSE'),
}
