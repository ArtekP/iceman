import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UnitService } from '../unit.service';


@Component({
  selector: 'app-add-unit-modal',
  templateUrl: './add-unit-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./add-unit-modal.component.scss']
})
export class AddUnitModalComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    capacity: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"),])
  })

  constructor(private unitService: UnitService) { }

// /\d/.test(form.controls['capacity'].value)

  ngOnInit(): void {
  }

  isValidNumber(value: string) {
    if(value.length ==0) {
      return false ;
    } else if(/^\d+$/.test(value)) {
      return false;
    } else {
      return true;
    }
  }

  onSubmit(name: string, capacity: string) {
    this.unitService.addUnit({name: name, capacity: capacity});
  }

}
