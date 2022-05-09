import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { IcecreamService } from '../../user/icecream-list/icecream.service';
import { AddIcecreamModalComponent } from './add-icecream-modal/add-icecream-modal.component';

@Component({
  selector: 'app-icecream-list-admin',
  templateUrl: './icecream-list-admin.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./icecream-list-admin.component.scss']
})
export class IcecreamListAdminComponent implements OnInit {
  public icecreamList$!: Observable<string[]>;

  constructor(private icecreamService: IcecreamService, private dialog: MatDialog) { }

  public ngOnInit(): void {
    this.icecreamList$ = this.icecreamService.getIcecreamList();
  }

  public onDelete(icecream: string) {
    this.icecreamService.deleteIcecream(icecream);
  }

  public openDialog() {
    this.dialog.open(AddIcecreamModalComponent);
  }
}
