import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IcecreamService } from '../../../user/icecream-list/icecream.service';

@Component({
  selector: 'app-add-icecream-modal',
  templateUrl: './add-icecream-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AddIcecreamModalComponent {
  public form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
  })

  constructor(private icecreamService: IcecreamService) { }

  public onSubmit(name: string) {
    this.icecreamService.addIcecream(name);
  }
}
