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
} from '../../auth/auth.service';
import { ClientService } from './client.service';
import { DocumentData } from 'firebase/firestore';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./clients-list.component.scss']
})

export class ClientsListComponent implements OnInit {
  public clientsList$!: Observable < DocumentData[] > ;

  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    private clientService: ClientService
  ) {}

  public ngOnInit() {
    this.clientsList$ = this.clientService.getClientsList();
  }

  public onAddUser(email: string, password: string) {
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

  public openDialog() {
    this.dialog.open(AddClientModalComponent);
  }
}
