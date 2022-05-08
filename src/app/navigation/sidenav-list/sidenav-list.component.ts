import { ViewportScroller } from '@angular/common';
import { Component, EventEmitter, Output, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();
  isAuth$!: any;
  isAdmin$!: any;

  constructor(private scroller: ViewportScroller,private authService: AuthService, private storage: StorageMap, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.isAuth$ = this.storage.watch('isAuth');
    this.isAdmin$ = this.storage.watch('isAdmin');
  }
  
  goToClients() {
    this.onClose();
    this.router.navigate(['admin-view/clients-list'], {relativeTo: this.route});
    this.scroller.scrollToAnchor("target");
  }

  goToUnits() {
    this.onClose();
    this.router.navigate(['admin-view/unit-list'], {relativeTo: this.route});
    this.scroller.scrollToAnchor("target");
  }

  goToOrdersUser() {
    this.onClose();
    this.router.navigate(['user-view/order-client'], {relativeTo: this.route});
    this.scroller.scrollToAnchor("target");
  }

  goToOrdersAdmin() {
    this.onClose();
    this.router.navigate(['admin-view/order-admin'], {relativeTo: this.route});
    this.scroller.scrollToAnchor("target");
  }

  goToIcecreamListAdmin() {
    this.onClose();
    this.router.navigate(['admin-view/icecream-list-admin'], {relativeTo: this.route});
    this.scroller.scrollToAnchor("target");
  }

  goToIcecreamListUser() {
    this.onClose();
    this.router.navigate(['user-view/icecream-list'], {relativeTo: this.route});
    this.scroller.scrollToAnchor("target");
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
