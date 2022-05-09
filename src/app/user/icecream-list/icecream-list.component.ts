import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  MaxLengthValidator,
  Validators
} from '@angular/forms';
import {
  MatDialog
} from '@angular/material/dialog';
import {
  StorageMap
} from '@ngx-pwa/local-storage';
import {
  ToastrService
} from 'ngx-toastr';
import {
  Observable
} from 'rxjs';
import {
  OrderService
} from '../order-client/order.service';
import {
  Unit
} from '../../shared/models/unit.model';
import {
  UnitService
} from '../../admin/unit-list/unit.service';
import {
  IcecreamService
} from './icecream.service';

@Component({
  selector: 'app-icecream-list',
  templateUrl: './icecream-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./icecream-list.component.scss']
})

export class IcecreamListComponent implements OnInit {
  public icecreamList$!: Observable < string[] > ;
  public favourites$!: Observable < string[] > ;
  public selectedValue!: string;
  public hasOrderedToday$!: Observable < boolean > ;
  public unitList$!: Observable < Unit[] > ;

  public formFav = new FormGroup({
    name: new FormControl(''),
    capacity: new FormControl(),
    amount: new FormControl()
  })

  public form = new FormGroup({
    name: new FormControl(''),
    capacity: new FormControl(),
    amount: new FormControl()
  })

  constructor(
    // private cdr: ChangeDetectorRef,
    private storage: StorageMap,
    public dialog: MatDialog,
    public unitService: UnitService,
    private icecreamService: IcecreamService,
    private orderService: OrderService,
    private toast: ToastrService) {}

  public ngOnInit() {
    this.icecreamList$ = this.icecreamService.getIcecreamList();
    this.unitList$ = this.unitService.getUnitList();
    this.favourites$ = this.icecreamService.getFavouritesFromDB();
    this.hasOrderedToday$ = this.storage.watch('hasOrderedToday') as Observable < boolean > ;
    // this.cdr.detectChanges();
  }

  public onAddToOrder(name: string, unit: Unit, amount: number) {
    this.hasOrderedToday$.subscribe(res => {
        if (res === false) {
          if (!unit || amount < 1) {
            this.toast.error('Wybierz jednostkę z listy oraz podaj ilość!');
            return;
          } else {
            let order = {
              "name": name,
              "unit": unit,
              "amount": amount
            }
            this.orderService.addToOrders(order);
            this.form.reset();
            this.formFav.reset();
            };
          } else {
            this.toast.error('Zamówienie zostało już dzisiaj złożone. Zapraszamy ponownie jutro!')
          }
        }).unsubscribe();
    }

    public onAddToFavourites(icecream: string) {
      this.icecreamService.addToFavourites(icecream);
    }

    public onRemoveFromFav(icecreamName: string) {
      this.icecreamService.removeFromFav(icecreamName);
    }
  }
