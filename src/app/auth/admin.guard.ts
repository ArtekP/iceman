import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate {
  constructor(private router: Router, private storage: StorageMap, private toast: ToastrService) {}

  canActivate() {
    return this.storage.get('isAdmin').pipe(
      map(res => {
        if(res) {
          return true;
        } else {
          this.toast.error('Musisz posiadać uprawnienia admina!');
          this.router.navigate(['user-view']);
          return false
        }
      })
    )
  }
}
