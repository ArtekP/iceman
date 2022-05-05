import { Component, EventEmitter, Output, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();
  public isAuth = false;
  public authSubscription!: Subscription;

  constructor(private authService: AuthService, private changeDetectionRef: ChangeDetectorRef, private router: Router) { }

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(authStatus =>{
      this.isAuth = authStatus;
      this.changeDetectionRef.detectChanges();
    })
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
