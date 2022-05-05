import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  Router
} from '@angular/router';
import { Store } from '@ngrx/store';
import {
  ToastrService
} from 'ngx-toastr';
import {
  AuthService
} from '../auth.service';

@Component({
  selector: 'app-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {






  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService, private store: Store) {}

  ngOnInit(): void {}

  getErrorMessage(val: string) {
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

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.authService.login(this.form.controls['email'].value, this.form.controls['password'].value).subscribe(data =>
      this.store.




    // this.authService.login({
    //   // name: '',
    //   // surname: '',
    //   email: this.form.controls['email'].value,
    //   password: this.form.controls['password'].value,
    //   // favourites: [],
    //   // role: ''
    // }).subscribe({
    //   next: () => {
    //     // this.authService.authChange.next(true);
    //     this.toastr.success('Poprawnie zalogowano do serwisu', '', {timeOut: 3000});
    //     if(this.form.controls['email'].value.toLowerCase() === 'admin@admin.com') {
    //       this.router.navigate(['/admin-view']);
    //     } else {
    //       this.router.navigate(['/user-view']);
    //     }
    //   },
    //   error: () => {
    //     this.toastr.error('Wprowadzono niepoprawne dane', '', {timeOut: 3000});
    //   }
    // });
  }

}
