import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { collection, DocumentData } from 'firebase/firestore';
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
  icecreamList$!: Observable<string[]>;

  constructor(private icecreamService: IcecreamService, private dialog: MatDialog, private firestore: Firestore) { }

  ngOnInit(): void {
    this.icecreamList$ = this.icecreamService.getIcecreamList();
  }

  onDelete(icecream: string) {
    this.icecreamService.deleteIcecream(icecream);
  }

  openDialog() {
    this.dialog.open(AddIcecreamModalComponent);
  }
}
