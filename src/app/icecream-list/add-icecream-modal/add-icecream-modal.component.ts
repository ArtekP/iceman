import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IcecreamService } from '../icecream.service';

@Component({
  selector: 'app-add-icecream-modal',
  templateUrl: './add-icecream-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./add-icecream-modal.component.scss']
})
export class AddIcecreamModalComponent {
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  })

  constructor(private icecreamService: IcecreamService) { }

  onSubmit(name: string) {
    this.icecreamService.addIcecream(name);
  }
}
