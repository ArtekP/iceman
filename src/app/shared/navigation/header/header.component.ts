import { Component, OnInit, EventEmitter, Output, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() public sidenavToggle = new EventEmitter<void>();
  isAuth$!: Observable<boolean>;
  private authSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private storage: StorageMap,) { }

  public ngOnInit() {
    // this.isAuth$ = this.store.select(state => state.auth.isAuth);
    this.isAuth$ = this.storage.watch('isAuth') as Observable<boolean>;
  }

  public onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
