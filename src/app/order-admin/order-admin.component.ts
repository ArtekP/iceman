import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { User } from '../auth/user.model';
import { ClientService } from '../clients-list/client.service';

@Component({
  selector: 'app-order-admin',
  templateUrl: './order-admin.component.html',
  styleUrls: ['./order-admin.component.scss']
})
export class OrderAdminComponent implements OnInit {
  orders$!: Observable<any>;
  icecream$!: Observable<any>;

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.orders$ = this.getOrdersByClient()
  }

  getOrdersByClient() {
    let formattedTodaysDate = formatDate(new Date(), 'dd/MM/yyyy', 'en-EN');
    return this.clientService.getClientsList().pipe(
      map(data => data.filter((user: User) => user.lastOrderDate == formattedTodaysDate))
    )
  }

  getOrdersByIcecreamName() {
    
  }
}
