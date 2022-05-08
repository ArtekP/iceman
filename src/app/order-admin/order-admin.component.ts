import {
  formatDate
} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';
import {
  map,
  Observable,
} from 'rxjs';
import {
  User
} from '../auth/user.model';
import {
  ClientService
} from '../clients-list/client.service';
import {
  Order
} from '../order-client/order.model';

@Component({
  selector: 'app-order-admin',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './order-admin.component.html',
  styleUrls: ['./order-admin.component.scss']
})
export class OrderAdminComponent implements OnInit {
  orders$!: Observable < any > ;
  icecream$!: Observable < any > ;
  ordersByIcecreamName$!: Observable < any > ;

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.orders$ = this.getOrdersByClient();
    // this.getOrdersByIcecreamName();
    this.ordersByIcecreamName$ = this.getOrdersByIcecreamName();
  }

  getOrdersByClient() {
    let formattedTodaysDate = formatDate(new Date(), 'dd/MM/yyyy', 'en-EN');
    return this.clientService.getClientsList().pipe(
      map(data => data.filter((user: User) => user.lastOrderDate == formattedTodaysDate))
    )
  }

  getOrdersByIcecreamName() {
    return this.orders$.pipe(
      map(function (users: any) {
        let arr: any = [];
        users.map((user: User) => user.order).forEach((order: Order) => arr = arr.concat(order));
        arr.sort(function (a: Order, b: Order) {
          if(a.name.toLocaleLowerCase() != b.name.toLocaleLowerCase()) {
          return a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()
          }
          console.log(arr)
          return (+a.unit.capacity > +b.unit.capacity);
        })
        for(let i = 0; i<arr.length -1; i++) {
          if(arr[i].name == arr[i + 1].name && arr[i]['capacity'] == arr[i+1]['capacity']) {
            arr[i]['amount'] += arr[i+1]['amount'];
            arr.splice(i+1, 1);
          }
        }
        return arr;
      })
    )
  }
}