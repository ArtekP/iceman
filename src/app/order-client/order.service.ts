import { formatDate } from '@angular/common';
import {
  Injectable
} from '@angular/core';
import {
  doc,
  Firestore
} from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import {
  getDoc,
  setDoc
} from 'firebase/firestore';
import {
  ToastrService
} from 'ngx-toastr';
import {
  AuthService
} from '../auth/auth.service';
import { AppState } from '../store/app.state';
import { OrderActions } from '../store/order';
import {
  Order
} from './order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orders: Order[] = [];
  userId!: string;
  todaysDate = new Date();

  constructor(private authService: AuthService, private firestore: Firestore, private toast: ToastrService, private store: Store<AppState>) {}

  addToOrders(order: Order) {
    this.orders.push(order);
    this.toast.info(`Dodano lody ${order.name} do zamówienia`)
  }

  sendOrderToDB() {
    let todaysDateFormatted = formatDate(this.todaysDate, 'dd/MM/yyyy', 'en-EN')
    let currentOrder = this.orders;
    this.userId = localStorage.getItem('uid')!;
    const userRef = doc(this.firestore, `users/${this.userId}`);
    getDoc(userRef).then(res => {
      let docData = res.data()!;
      docData['order'] = currentOrder;
      docData['lastOrderDate'] = todaysDateFormatted;
      setDoc(userRef, docData);
    });
    this.orders = [];
  }

  repeatLastOrder() {
    let todaysDateFormatted = formatDate(this.todaysDate, 'dd/MM/yyyy', 'en-EN')
    this.userId = localStorage.getItem('uid')!;
    const userRef = doc(this.firestore, `users/${this.userId}`);
    getDoc(userRef).then(res => {
      let docData = res.data()!;
      docData['lastOrderDate'] = todaysDateFormatted;
      setDoc(userRef, docData);
    });
    this.store.dispatch(OrderActions.setHasOrderedTodayTrue());
    this.toast.success('Zamówienie zostało przyjęte!')
  }
}