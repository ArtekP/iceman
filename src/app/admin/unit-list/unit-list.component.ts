import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  Observable
} from 'rxjs';
import { AddUnitModalComponent } from './add-unit-modal/add-unit-modal.component';
import { Unit } from '../../shared/models/unit.model';
import { UnitService } from './unit.service';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./unit-list.component.scss']
})

export class UnitListComponent implements OnInit {
  public containerList$!: Observable < Unit[] >;

  constructor(private unitService: UnitService, private cdr: ChangeDetectorRef, public dialog: MatDialog) {}

  public ngOnInit(): void {
    this.containerList$ = this.unitService.getUnitList() as Observable<Unit[]>;
    this.cdr.detectChanges();
  }

  public openDialog() {
    this.dialog.open(AddUnitModalComponent);
  }

  public onDelete(unitName: string) {
    this.unitService.deleteUnit(unitName);
  }
}
