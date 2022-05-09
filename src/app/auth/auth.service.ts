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
} from "../shared/models/user.model";
import {
  doc,
  Firestore,
  getDoc,
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
import { formatDate } from "@angular/common";
import { OrderActions } from "../store/order";
import { StorageMap } from "@ngx-pwa/local-storage";

@Injectable()

export class AuthService {
  userId!: string;
  authChange = new Subject < boolean > ();
  newUser$!: Observable < User > ;

  constructor(
    private router: Router,
    private fireAuth: Auth,
    private firestore: Firestore,
    private toast: ToastrService,
    private store: Store < AppState > ,
    private toastr: ToastrService,
    private storage: StorageMap
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
  }

  createNewUserInDB(newUser: User) {
    return from(createUserWithEmailAndPassword(this.fireAuth, newUser.email, newUser.password))
  }

  signIn(email: string, password: string) {
    this.login(email, password).subscribe({
      next: (res) => {
        this.store.dispatch(AuthActions.setAuthenticated());
        this.storage.set('isAuth', true, {type: 'boolean'}).subscribe(() => {});
        this.store.dispatch(AuthActions.setLoggedUserId({
          uid: res.user['uid']
        }));
        this.storage.set('uid', res.user['uid'], {type: 'string'}).subscribe(() => {});
        localStorage.setItem('uid', res.user['uid']);
        this.userId = localStorage.getItem('uid')!;
        this.toastr.success('Poprawnie zalogowano do serwisu', '', {
          timeOut: 3000
        });
        if (res.user['uid'] === 'OH8OXrtaytM80PEIC4jqFWbRtHm1') {
          this.store.dispatch(AuthActions.setAdminTrue());
          this.storage.set('isAdmin', true, {type: 'boolean'}).subscribe(() => {});
          this.router.navigate(['/admin-view']);
        }
        else {
          this.storage.set('isAdmin', false, { type: 'boolean'});
          this.hasOrderedToday();
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

  hasOrderedToday() {
    let todaysDate = formatDate(new Date(), 'dd/MM/yyyy', 'en-EN');
    let lastOrderDate: string;
    const userRef = doc(this.firestore, `users/${this.userId}`);
    getDoc(userRef).then(res => {
      let docData = res.data()!;
      lastOrderDate = docData['lastOrderDate'];
      if(lastOrderDate != '') {
        this.store.dispatch(OrderActions.setHasEverOrderedTrue());
        this.storage.set('hasEverOrdered', true, {type: 'boolean'}).subscribe(() => {});
      } else {
        this.store.dispatch(OrderActions.setHasEverOrderedFalse());
        this.storage.set('hasEverOrdered', false, {type: 'boolean'}).subscribe(() => {});
      }
      if(todaysDate == lastOrderDate) {
        this.store.dispatch(OrderActions.setHasOrderedTodayTrue());
        this.storage.set('hasOrderedToday', true, {type: 'boolean'}).subscribe(() => {});
      } else {
        this.store.dispatch(OrderActions.setHasOrderedTodayFalse());
        this.storage.set('hasOrderedToday', false, {type: 'boolean'}).subscribe(() => {});
      }
    });
  }

  login(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.fireAuth, email, password));
  }

  logout() {
    this.store.dispatch(AuthActions.setUnauthenticated());
    this.store.dispatch(AuthActions.setAdminFalse());
    this.store.dispatch(AuthActions.clearLoggedUserId());
    this.storage.clear().subscribe(() => {});
    this.router.navigate(['/login']);
    this.toast.success('Wylogowano pomyślnie. Zapraszamy ponownie!')
    return from(this.fireAuth.signOut());
  }
}
