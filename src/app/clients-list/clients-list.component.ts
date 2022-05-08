import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';
import {
  MatDialog
} from '@angular/material/dialog';
import {
  Observable
} from 'rxjs';
import {
  AddClientModalComponent
} from './add-client-modal/add-client-modal.component';
import {
  AuthService
} from '../auth/auth.service';
import { ClientService } from './client.service';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent implements OnInit {
  clientsList$!: Observable < any > ;

  constructor(private authService: AuthService, public dialog: MatDialog, private clientService: ClientService) {}

  ngOnInit() {
    this.clientsList$ = this.getClientsList();
  }

  onAddUser(email: string, password: string) {
    this.authService.registerUser({
      name: '',
      email: email,
      password: password,
      favourites: [],
      role: 'user',
      order: [],
      lastOrderDate: ''
    });
  }

  openDialog() {
    this.dialog.open(AddClientModalComponent);
  }

  getClientsList() {
    return this.clientService.getClientsList();
  }
}
