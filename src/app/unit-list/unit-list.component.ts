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
  constructor(private unitService: UnitService, private cdr: ChangeDetectorRef, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.containerList$ = this.unitService.getUnitList();
    this.cdr.detectChanges();
  }

  openDialog() {
    this.dialog.open(AddUnitModalComponent);
  }

  onDelete(index: number) {
    this.unitService.deleteUnit(index);
  }
}
