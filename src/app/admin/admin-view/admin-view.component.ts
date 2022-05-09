import { ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./admin-view.component.scss']
})
export class AdminViewComponent {

  constructor(private router: Router, private scroller: ViewportScroller, private route: ActivatedRoute) { }

  goToClients() {
    this.router.navigate(['clients-list'], {relativeTo: this.route});
        this.scroller.scrollToAnchor("target");
  }

  goToUnits() {
    this.router.navigate(['unit-list'], {relativeTo: this.route});
        this.scroller.scrollToAnchor("target");
  }

  goToOrders() {
    this.router.navigate(['order-admin'], {relativeTo: this.route});
        this.scroller.scrollToAnchor("target");
  }

  goToIcecreamList() {
    this.router.navigate(['icecream-list-admin'], {relativeTo: this.route});
        this.scroller.scrollToAnchor("target");
  }
}
