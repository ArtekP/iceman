import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { from, Observable, of } from 'rxjs';
import { AppState } from '../store/app.state';
import { AddIcecreamModalComponent } from './add-icecream-modal/add-icecream-modal.component';
import { IcecreamService } from './icecream.service';

@Component({
  selector: 'app-icecream-list',
  templateUrl: './icecream-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./icecream-list.component.scss']
})
export class IcecreamListComponent implements OnInit {
  icecreamList$!: Observable<any>;
  favourites$!: Observable<any>;
  value = 'Clear me';
  admin$ = this.store.select(state => state.auth.isAdmin);

  constructor(private httpClient: HttpClient, private store: Store<AppState>, private firestore: Firestore, private cdr: ChangeDetectorRef, public dialog: MatDialog, private icecreamSerivce: IcecreamService) { }

  ngOnInit(): void {
    this.icecreamList$ = this.getIcecreamList();
    this.icecreamSerivce.getFavouritesFromDB();
    this.icecreamSerivce.favouritesSubject.subscribe((val: any) => {
      this.favourites$ = of(val)
    })
    this.cdr.detectChanges();
  }


  onAddToFavourites(icecream: string) {
    this.icecreamSerivce.addToFavourites(icecream);
  }

  openDialog() {
    this.dialog.open(AddIcecreamModalComponent);
  }

  onDelete(icecream: string) {
    this.icecreamSerivce.deleteIcecream(icecream);
  }

  getIcecreamList() {
    const icecreamRef = collection(this.firestore, 'icecream');
    return collectionData(icecreamRef, { idField: 'id' }) as Observable<any>;
  }
}
