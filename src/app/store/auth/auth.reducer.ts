import {
  createReducer,
  on
} from "@ngrx/store";
import {
  AuthActions
} from "./auth.actions";
import {
  AuthState
} from "./auth.state";

const initialState: AuthState = {
  isAuth: false,
  isAdmin: false,
  loggedUserId: '',
}

export const authReducer = createReducer(initialState,
  on(AuthActions.setAuthenticated, (state) => {
    return {
      ...state,
      isAuth: true
      }
    }
  ),
  on(AuthActions.setUnauthenticated, (state) => {
    return {
      ...state,
      isAuth: false
      }
    }
  ),
  on(AuthActions.setAdminTrue, (state) => {
    return {
      ...state,
      isAdmin: true
    }
  }),
  on(AuthActions.setAdminFalse, (state) => {
    return {
      ...state,
      isAdmin: false
    }
  }),
  on(AuthActions.setLoggedUserId, (state) => {
    return {
      ...state,
      loggedUserId: 
    }
  })
);
