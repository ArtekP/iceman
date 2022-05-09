import { ViewportScroller } from '@angular/common';
import { Component, EventEmitter, Output, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  @Output() public closeSidenav = new EventEmitter<void>();
  public isAuth$!: Observable<boolean>;
  public isAdmin$!: Observable<boolean>;

  constructor(
    private scroller: ViewportScroller,
    private authService: AuthService,
    private storage: StorageMap,
    private router: Router,
    private route: ActivatedRoute) { }

  public ngOnInit() {
    this.isAuth$ = this.storage.watch('isAuth') as Observable<boolean>;
    this.isAdmin$ = this.storage.watch('isAdmin') as Observable<boolean>;
  }

  public goToClients() {
    this.onClose();
    this.router.navigate(['admin-view/clients-list'], {relativeTo: this.route});
    this.scroller.scrollToAnchor("target");
  }

  public goToUnits() {
    this.onClose();
    this.router.navigate(['admin-view/unit-list'], {relativeTo: this.route});
    this.scroller.scrollToAnchor("target");
  }

  public goToOrdersUser() {
    this.onClose();
    this.router.navigate(['user-view/order-client'], {relativeTo: this.route});
    this.scroller.scrollToAnchor("target");
  }

  public goToOrdersAdmin() {
    this.onClose();
    this.router.navigate(['admin-view/order-admin'], {relativeTo: this.route});
    this.scroller.scrollToAnchor("target");
  }

  public goToIcecreamListAdmin() {
    this.onClose();
    this.router.navigate(['admin-view/icecream-list-admin'], {relativeTo: this.route});
    this.scroller.scrollToAnchor("target");
  }

  public goToIcecreamListUser() {
    this.onClose();
    this.router.navigate(['user-view/icecream-list'], {relativeTo: this.route});
    this.scroller.scrollToAnchor("target");
  }

  public onClose() {
    this.closeSidenav.emit();
  }

  public onLogout() {
    this.onClose();
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
