import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private storage: StorageMap, private router: Router) {}

  canActivate() {
    return this.storage.get('isAuth').pipe(
      map(res => {
        if (!res) {
          return true;
        } else {
          this.router.navigate(['/user-view'])
          return false;
        }
      })
    )
  }

}
