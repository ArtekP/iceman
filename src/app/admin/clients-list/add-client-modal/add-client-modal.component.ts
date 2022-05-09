import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-add-client-modal',
  templateUrl: './add-client-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: ['.form { padding: 1rem;}']
})

export class AddClientModalComponent {
  public form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6),])
  })

  constructor(private authService: AuthService) { }

  public onSubmit(name: string, email: string, password: string) {
    this.authService.registerUser({
      name: name,
      email: email,
      password: password,
      favourites: [],
      role: 'user',
      order: [],
      lastOrderDate: ''
    });
  }
}
