import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Observable, of } from 'rxjs';
import { AppState } from '../store/app.state';
import { OrderActions } from '../store/order';
import { OrderService } from './order.service';

@Component({
  selector: 'app-order-client',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './order-client.component.html',
  styleUrls: ['./order-client.component.scss']
})
export class OrderClientComponent implements OnInit {
  order$!: Observable<any>;
  hasOrderedToday$!: any;
  hasEverOrdered$!: any;

  constructor(private orderService: OrderService, private store: Store<AppState>, private storage: StorageMap) { }

  ngOnInit(): void {
    this.getOrderList();
    // this.hasOrderedToday$ = this.store.select(state => state.order.hasOrderedToday);
    this.hasOrderedToday$ = this.storage.watch('hasOrderedToday');
    // this.hasEverOrdered$ = this.store.select(state => state.order.hasEverOrdered);
    this.hasEverOrdered$ = this.storage.watch('hasEverOrdered');
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
