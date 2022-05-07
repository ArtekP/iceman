import { formatDate } from '@angular/common';
import {
  Injectable
} from '@angular/core';
import {
  doc,
  Firestore
} from '@angular/fire/firestore';
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
import {
  Order
} from './order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orders: Order[] = [];
  userId!: string;
  todaysDate!: Date;

  constructor(private authService: AuthService, private firestore: Firestore, private toast: ToastrService) {}

  addToOrders(order: Order) {
    this.todaysDate = new Date();
    this.orders.push(order);
    this.toast.info(`Dodano lody ${order.name} do zamówienia`)
  }

  sendOrderToDB() {
    let formatted = formatDate(this.todaysDate, 'dd/MM/yyyy', 'en-EN')
    let currentOrder = this.orders;
    this.userId = this.authService.userId;
    const userRef = doc(this.firestore, `users/${this.userId}`);
    getDoc(userRef).then(res => {
      let docData: any;
      docData = res.data();
      docData.order = currentOrder;
      docData.lastOrderDate = formatted;
      setDoc(userRef, docData);
    });
    this.orders = [];
  }
}