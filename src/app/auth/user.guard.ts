import {
  Injectable
} from '@angular/core';
import {
  CanActivate,
  Router
} from '@angular/router';
import {
  StorageMap
} from '@ngx-pwa/local-storage';
import {
  map
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserGuard implements CanActivate {
  constructor(private router: Router, private storage: StorageMap) {}
  canActivate() {
    return this.storage.get('isAdmin').pipe(
      map(res => {
        if (!res) {
          return true;
        } else {
          this.router.navigate(['admin-view']);
          return false;
        }
      })
    )
  }
}
