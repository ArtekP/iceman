import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from '../store/app.state';
import { OrderActions } from '../store/order';
import { OrderService } from './order.service';

@Component({
  selector: 'app-order-client',
  templateUrl: './order-client.component.html',
  styleUrls: ['./order-client.component.scss']
})
export class OrderClientComponent implements OnInit {
  order$!: Observable<any>;
  hasOrderedToday$!: Observable<boolean>;

  constructor(private orderService: OrderService, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.getOrderList();
    this.hasOrderedToday$ = this.store.select(state => state.order.hasOrderedToday);
  }

  getOrderList() {
    this.order$ = of(this.orderService.orders);
  }

  onSubmit() {
    this.orderService.sendOrderToDB();
    this.order$ = of([]);
    this.store.dispatch(OrderActions.setHasOrderedTodayTrue())
  }
}
