import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  UnitService
} from '../unit.service';

@Component({
  selector: 'app-add-unit-modal',
  templateUrl: './add-unit-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`.form {
    padding: 1rem;
    }

    .hint {
    color: red;
    }`]
})

export class AddUnitModalComponent {
  public form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    capacity: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(100), Validators.max(10000)])
  })

  constructor(private unitService: UnitService) {}

  public isValidNumber(value: string) {
    if (value.length == 0 || value == '0') {
      return false;
    } else if (/^\d+$/.test(value)) {
      return false;
    } else {
      return true;
    }
  }

  public onSubmit(name: string, capacity: string) {
    this.unitService.addUnit({
      name: name,
      capacity: capacity
    });
  }
}
