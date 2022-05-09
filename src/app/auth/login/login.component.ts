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
  AuthService
} from '../auth.service';

@Component({
  selector: 'app-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  constructor(private authService: AuthService) {}

  public getErrorMessage(val: string) {
    if (val === 'email' && this.form.controls['email'].touched && this.form.controls['email'].value.length === 0) {
      return 'Pole nie może być puste';
    }

    if (val === 'password' && this.form.controls['password'].touched && this.form.controls['password'].value.length === 0) {
      return 'Pole nie może być puste';
    }

    if (val === 'email') {
      return this.form.controls['email'].hasError('email') ? 'Niepoprawny adres email' : '';
    } else {
      return this.form.controls['password'].hasError('password') ? 'Niepoprawne hasło' : '';
    }
  }

  public onSubmit() {
    this.authService.signIn(this.form.controls['email'].value, this.form.controls['password'].value);
  }
}
