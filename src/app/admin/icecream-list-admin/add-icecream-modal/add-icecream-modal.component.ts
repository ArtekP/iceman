import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IcecreamService } from '../../../user/icecream-list/icecream.service';

@Component({
  selector: 'app-add-icecream-modal',
  templateUrl: './add-icecream-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AddIcecreamModalComponent {
  public form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
  })

  constructor(private icecreamService: IcecreamService, private toast: ToastrService) { }

  public onSubmit(name: string) {
    if(/^[a-z0-9]+$/i.test(name)) {
      this.icecreamService.addIcecream(name);
    } else {
      this.toast.error('Nazwa może składać się tylko z liter i cyfr!')
    }
  }
}
