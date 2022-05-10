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
  templateUrl: './order-client.component.html'
})

export class OrderClientComponent implements OnInit {
  public order$!: Observable<Order[]>;
  public hasOrderedToday$!: Observable<boolean>;
  public hasEverOrdered$!: Observable<boolean>;

  constructor(
    private orderService: OrderService,
    private store: Store<AppState>,
    private storage: StorageMap
  ) {}

  public ngOnInit(): void {
    this.getOrderList();
    this.hasOrderedToday$ = this.storage.watch('hasOrderedToday') as Observable<boolean>;
    this.hasEverOrdered$ = this.storage.watch('hasEverOrdered') as Observable<boolean>;
  }

  public getOrderList() {
    this.order$ = of(this.orderService.orders);
  }

  public clearOrder() {
    this.orderService.clearOrder();
    this.order$ = of([]);
  }

  public onSubmit() {
    this.orderService.sendOrderToDB();
    this.order$ = of([]);
    this.store.dispatch(OrderActions.setHasOrderedTodayTrue())
    this.storage.set('hasOrderedToday', true).subscribe(() => {});
  }

  public onRepeatLastOrder() {
    this.orderService.repeatLastOrder();
  }
}
