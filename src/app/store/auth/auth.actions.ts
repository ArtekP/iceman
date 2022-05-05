import { createAction } from "@ngrx/store";

export const AuthActions = {
  setAuthenticated: createAction('[Auth] Set Authenticated'),
  setUnauthenticated: createAction('[Auth] Set Unauthenticated'),
  setAdminTrue: createAction('[Auth] SetAdminTrue'),
  setAdminFalse: createAction('[Auth] SetAdminFalse'),
  setLoggedUserId: createAction('[Auth] Set ID of logged user'),
  clearLoggedUserId: createAction('[Auth] Clear Logged User ID'),
}
