import {
  Injectable
} from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from "@angular/router";
import {
  Store
} from "@ngrx/store";
import { StorageMap } from "@ngx-pwa/local-storage";
import {
  map
} from "rxjs";
import {
  AppState
} from '../store/app.state';
import {
  AuthActions
} from "../store/auth";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store < AppState > , private router: Router, private storage: StorageMap) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.storage.get('isAuth').pipe(map(res => {
      if(res) {
        return true;
      } else {
        this.router.navigate(['login'])
        return false;
      }
    }))
  }
  // if (res.user['uid'] === 'OH8OXrtaytM80PEIC4jqFWbRtHm1') {
  //   this.store.dispatch(AuthActions.setAdminTrue());
  //   this.router.navigate(['/admin-view']);
  // } else {
  //   this.router.navigate(['/user-view']);
  // }
  // return this.store.select(state => state.auth.isAdmin)

}