import {
  Injectable
} from "@angular/core";
import {
  CanActivate,
  Router
} from "@angular/router";
import { StorageMap } from "@ngx-pwa/local-storage";
import {
  map
} from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private storage: StorageMap) {}

  canActivate() {
    return this.storage.get('isAuth').pipe(
      map(res => {
        if(res) {
          return true;
        } else {
          this.router.navigate(['login'])
          return false;
        }
      })
    )
  }
}