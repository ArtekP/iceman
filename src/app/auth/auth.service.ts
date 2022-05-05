import {
  Injectable
} from "@angular/core";
import {
  Router
} from "@angular/router";
import {
  from,
  Observable,
  Subject
} from "rxjs";
import {
  Auth,
  createUserWithEmailAndPassword
} from "@angular/fire/auth";
import {
  signInWithEmailAndPassword
} from "firebase/auth";
import {
  User
} from "./user.model";
import {
  doc,
  Firestore,
  setDoc
} from "@angular/fire/firestore";
import {
  ToastrService
} from "ngx-toastr";
import {
  Store
} from "@ngrx/store";
import {
  AppState
} from "../store/app.state";
import {
  AuthActions
} from "../store/auth";

@Injectable()

export class AuthService {
  authChange = new Subject < boolean > ();
  private user!: User | null;
  newUser$!: Observable < User > ;

  constructor(
    private router: Router,
    private fireAuth: Auth,
    private firestore: Firestore,
    private toast: ToastrService,
    private store: Store < AppState > ,
    private toastr: ToastrService
  ) {}

  registerUser(newUser: User) {
    this.createNewUserInDB(newUser).subscribe({
      next: (data) => {
        setDoc(doc(this.firestore, 'users', data.user.uid), newUser);
        this.toast.success(`Dodano użytkownika ${newUser.name}`)
      },
      error: () => {
        this.toast.error('Wprowadzono niepoprawne dane.')
      }
    });
    // POPRAWIC walidacje MAILA!!!!!!!! NIE PRZECHODZI PRZY UWIERZYTELNIANIU
  }

  createNewUserInDB(newUser: User) {
    return from(createUserWithEmailAndPassword(this.fireAuth, newUser.email, newUser.password))
  }

  signIn(email: string, password: string) {
    this.login(email, password).subscribe({
      next: (res) => {
        this.store.dispatch(AuthActions.setAuthenticated());
        this.store.dispatch(AuthActions.setLoggedUserId({
          uid: res.user['uid']
        }));
        this.toastr.success('Poprawnie zalogowano do serwisu', '', {
          timeOut: 3000
        });
        if (res.user['uid'] === 'OH8OXrtaytM80PEIC4jqFWbRtHm1') {
          this.store.dispatch(AuthActions.setAdminTrue());
          this.router.navigate(['/admin-view']);
        } else {
          this.router.navigate(['/user-view']);
        }
      },
      error: () => {
        this.toastr.error('Wprowadzono niepoprawne dane', '', {
          timeOut: 3000
        });
      }
    });
  }

  login(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.fireAuth, email, password));
  }

  logout() {
    this.router.navigate(['/login']);
    this.store.dispatch(AuthActions.setUnauthenticated());
    this.store.dispatch(AuthActions.setAdminFalse());
    this.store.dispatch(AuthActions.clearLoggedUserId());
    return from(this.fireAuth.signOut());
  }
}