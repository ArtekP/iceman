import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from '../store/app.state';
import { AuthActions } from "../store/auth";

@Injectable()
export class AuthGuard implements CanActivate {


  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select(state => state.auth.isAdmin)
  }
}
