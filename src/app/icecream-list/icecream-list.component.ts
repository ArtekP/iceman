import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Observable} from 'rxjs';
import { OrderService } from '../order-client/order.service';
import { AppState } from '../store/app.state';
import { Unit } from '../unit-list/unit.model';
import { UnitService } from '../unit-list/unit.service';
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
  selectedValue!: string;
  hasOrderedToday$!: Observable<boolean>;
  unitList$!: Observable<any>;
  // admin$ = this.store.select(state => state.auth.isAdmin);
  admin$ = this.storage.get('isAdmin');

  formFav = new FormGroup({
    name: new FormControl(''),
    capacity: new FormControl(),
    amount: new FormControl(0)
  })

  form = new FormGroup({
    name: new FormControl(''),
    capacity: new FormControl(),
    amount: new FormControl(0)
  })

  constructor(
    private storage: StorageMap,
    private store: Store<AppState>,
    private firestore: Firestore,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    public unitService: UnitService,
    private icecreamSerivce: IcecreamService,
    private orderService: OrderService)
  {}


  ngOnInit(): void {
    this.icecreamList$ = this.getIcecreamList();
    this.unitList$ = this.unitService.getUnitList();
    this.favourites$ = this.icecreamSerivce.getFavouritesFromDB();
    this.hasOrderedToday$ = this.store.select(state => state.order.hasOrderedToday)
    this.cdr.detectChanges();
  }

  onAddToOrder(name: string, unit: Unit, amount: number) {
    if(unit.name === '' || amount === 0) {
      return
    } else {
      let order = {"name": name, "unit": unit, "amount": amount};
      this.orderService.addToOrders(order);
    }
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
