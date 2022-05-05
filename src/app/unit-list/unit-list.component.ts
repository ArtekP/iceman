import {
  HttpClient
} from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import {
  collection,
  collectionData,
  CollectionReference,
  Firestore
} from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import {
  Observable
} from 'rxjs';
import { AddUnitModalComponent } from './add-unit-modal/add-unit-modal.component';
import { Unit } from './unit.model';
import { UnitService } from './unit.service';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./unit-list.component.scss']
})
export class UnitListComponent implements OnInit {
  containerList$!: Observable < any > ;
  unitCollection!: CollectionReference;
  constructor(private httpClient: HttpClient, private unitService: UnitService, private firestore: Firestore, private cdr: ChangeDetectorRef, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.containerList$ = this.getContainerList();
    this.cdr.detectChanges();
  }

  openDialog() {
    this.dialog.open(AddUnitModalComponent);
  }

  getContainerList() {
    const unitRef = collection(this.firestore, 'units');
    return collectionData(unitRef, {
      idField: 'id'
    }) as Observable < any > ;
  }

  onDelete(item: Unit) {
    this.unitService.deleteUnit(item);
  }
}
