import { Component, OnInit, EventEmitter, Output, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() public sidenavToggle = new EventEmitter<void>();
  isAdmin$!: Observable<boolean>;
  isAuth$!: Observable<boolean>;
  private authSubscription!: Subscription;

  constructor(private authService: AuthService, private router: Router, private store: Store<AppState>) { }

  public ngOnInit() {
    // this.authSubscription = this.authService.authChange.subscribe(authStatus =>{
    //   this.isAuth = authStatus;
    //   this.changeDetectionRef.detectChanges();
    // })
    this.isAuth$ = this.store.select(state => state.auth.isAuth);
    this.isAdmin$ = this.store.select(state => state.auth.isAdmin);
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
