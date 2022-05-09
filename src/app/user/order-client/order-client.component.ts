import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Observable, of } from 'rxjs';
import { Order } from 'src/app/shared/models/order.model';
import { AppState } from '../../store/app.state';
import { OrderActions } from '../../store/order';
import { OrderService } from './order.service';

@Component({
  selector: 'app-order-client',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './order-client.component.html',
  styleUrls: ['./order-client.component.scss']
})
export class OrderClientComponent implements OnInit {
  order$!: Observable<Order[]>;
  hasOrderedToday$!: Observable<boolean>;
  hasEverOrdered$!: Observable<boolean>;

  constructor(private orderService: OrderService, private store: Store<AppState>, private storage: StorageMap) { }

  ngOnInit(): void {
    this.getOrderList();
    this.hasOrderedToday$ = this.storage.watch('hasOrderedToday') as Observable<boolean>;
    this.hasEverOrdered$ = this.storage.watch('hasEverOrdered') as Observable<boolean>;
  }

  getOrderList() {
    this.order$ = of(this.orderService.orders);
  }

  onSubmit() {
    this.orderService.sendOrderToDB();
    this.order$ = of([]);
    this.store.dispatch(OrderActions.setHasOrderedTodayTrue())
    this.storage.set('hasOrderedToday', true).subscribe(() => {});
  }

  onRepeatLastOrder() {
    this.orderService.repeatLastOrder();
  }
}
