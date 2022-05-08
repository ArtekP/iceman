import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { StorageMap } from '@ngx-pwa/local-storage';
import { map, Observable } from 'rxjs';
import { AppState } from '../store/app.state';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private store: Store < AppState > , private router: Router, private storage: StorageMap) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.storage.get('isAdmin').pipe(map(res => {
      if(res) {
        return true;
      } else {
        this.router.navigate(['user-view']);
        return false
      }
    }))
    
  }
  
}
