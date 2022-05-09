import {
  formatDate
} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DocumentData } from 'firebase/firestore';
import {
  map,
  Observable,
} from 'rxjs';
import {
  User
} from '../../shared/models/user.model';
import {
  ClientService
} from '../clients-list/client.service';
import {
  Order
} from '../../shared/models/order.model';

@Component({
  selector: 'app-order-admin',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './order-admin.component.html',
  styleUrls: ['./order-admin.component.scss']
})
export class OrderAdminComponent implements OnInit {
  public orders$!: Observable < DocumentData[] > ;
  public icecream$!: Observable < DocumentData[] > ;
  public ordersByIcecreamName$!: Observable < DocumentData[] > ;
  public displayedColumns: string[] = ['client-name', 'unit-name', 'unit-capacity', 'order-amount'];
  public dataSource = new MatTableDataSource();

  constructor(private clientService: ClientService) {}

  public ngOnInit(): void {
    this.orders$ = this.getOrdersByClient();
    this.ordersByIcecreamName$ = this.getOrdersByIcecreamName();
  }

  public getOrdersByClient() {
    let formattedTodaysDate = formatDate(new Date(), 'dd/MM/yyyy', 'en-EN');
    return this.clientService.getClientsList().pipe(
      map(data => data.filter(user => user['lastOrderDate'] == formattedTodaysDate))
    )
  }

  public getOrdersByIcecreamName() {
    return this.orders$.pipe(
      map(function (users: any) {
        let arr: any = [];
        users.map((user: User) => user.order).forEach((order: Order) => arr = arr.concat(order));
        arr.sort(function (a: Order, b: Order) {
          if(a.name.toLocaleLowerCase() != b.name.toLocaleLowerCase()) {
          return a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()
          }
          return (+a.unit.capacity > +b.unit.capacity);
        })
        return arr;
      })
    )
  }
}
