import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { StorageMap } from '@ngx-pwa/local-storage';
import { doc, getDoc } from 'firebase/firestore';
import { Observable, of, Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { OrderService } from '../order-client/order.service';
import { AppState } from '../store/app.state';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {
  userId!: string;
  userName$ = new Subject<any>();
  hasOrderedToday$!: any;
  hasEverOrdered$!: Observable<boolean>;

  constructor(
    private orderService: OrderService, 
    private route: ActivatedRoute, 
    private router: Router, 
    private store: Store<AppState>, 
    private firestore: Firestore,
    private storage: StorageMap) { }

  ngOnInit(): void {
    this.getUserName();
    this.hasEverOrdered$ = this.store.select(state => state.order.hasEverOrdered);
    // this.hasOrderedToday$ = this.store.select(state => state.order.hasOrderedToday);
    this.hasOrderedToday$ = this.storage.watch('hasOrderedToday');
  }

  getUserName() {
    this.userId = localStorage.getItem('uid')!;
    const userRef = doc(this.firestore, `users/${this.userId}`);
    getDoc(userRef).then(res => {
      let docData = res.data()!;
      this.userName$.next(docData['name'])
    });
  }

  goToIcecreamList() {
    this.router.navigate(['icecream-list'], {relativeTo: this.route})
  }

  goToOrders() {
    this.router.navigate(['order-client'], {relativeTo: this.route})
  }

  onIcecreamListClick() {
    this.router.navigate(['/icecream-list'])
  }

  onOrderListClick() {
    this.router.navigate(['/order-client'])
  }

  onRepeatLastOrder() {
    this.orderService.repeatLastOrder();
  }

}
