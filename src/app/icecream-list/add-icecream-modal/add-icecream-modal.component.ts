import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IcecreamService } from '../icecream.service';

@Component({
  selector: 'app-add-icecream-modal',
  templateUrl: './add-icecream-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./add-icecream-modal.component.scss']
})
export class AddIcecreamModalComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  })

  constructor(private icecreamService: IcecreamService) { }

  ngOnInit(): void {
  }

  onSubmit(name: string) {
    this.icecreamService.addIcecream(name);
  }
}
