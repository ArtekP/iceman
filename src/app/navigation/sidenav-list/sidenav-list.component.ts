import { Component, EventEmitter, Output, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-sidenav-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();
  isAuth$!: Observable<boolean>;
  isAdmin$!: Observable<boolean>;

  constructor(private authService: AuthService, private changeDetectionRef: ChangeDetectorRef, private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
    this.isAuth$ = this.store.select(state => state.auth.isAuth);
    this.isAdmin$ = this.store.select(state => state.auth.isAdmin);
  }

  onClose() {
    this.closeSidenav.emit();
  }

  onLogout() {
    this.onClose();
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
