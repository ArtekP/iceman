import { Injectable, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { from, Observable, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Auth, createUserWithEmailAndPassword } from "@angular/fire/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { User } from "./user.model";
import { collection, collectionData, doc, Firestore, getDoc, setDoc } from "@angular/fire/firestore";
import { ToastrService } from "ngx-toastr";
import { Store } from "@ngrx/store";
import { AppState } from "../store/app.state";
import { AuthActions } from "../store/auth";

@Injectable()

export class AuthService implements OnInit {
  allUsers$: any;
  allUsersArray!: any[];
  authChange = new Subject<boolean>();
  private user!: User | null;
  newUser$!: Observable<User>;

  constructor(
    private router: Router,
    private fireAuth: Auth,
    private firestore: Firestore,
    private toast: ToastrService,
    private store: Store<AppState>
    ) {}

  ngOnInit() {

  }

  registerUser(newUser: User) {
    const docRef = doc(this.firestore, 'users/F8qCwjDaIe2xpvcsNukP');
    getDoc(docRef).then(res => {
      let docData: any;
      docData = res.data();

      if((docData.users.filter((x: any) => x.email == newUser.email)).length > 0) {
        this.toast.error('Klient o danym mailu już istnieje!')
        return;
      } else {
        docData.users.push(newUser);
        setDoc(docRef, docData);
      }
      this.toast.success(`Dodano klienta "${newUser.email}"`)
    });
    return from(createUserWithEmailAndPassword(this.fireAuth, newUser.email, newUser.password));
  }

  login(email: string, password: string) {
    // if(authData.role === 'admin') {
    //   this.store.dispatch(AuthActions.setAdminTrue());
    // }

    this.allUsers$ = this.getAllUsers();
    this.allUsers$.subscribe((data:any) => this.allUsersArray = data[0].users);

    // this.user = {
    //   name: authData.name,
    //   surname: authData.surname,
    //   email: authData.email,
    //   password: authData.password,
    //   favourites: authData.favourites,
    //   role: authData.role
    // }
    this.store.dispatch(AuthActions.setAuthenticated());

    return from(signInWithEmailAndPassword(this.fireAuth, email, password));
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);
    this.store.dispatch(AuthActions.setUnauthenticated());
    this.store.dispatch(AuthActions.setAdminFalse());
    localStorage.clear();
    return from(this.fireAuth.signOut());
  }

  getUser() {
    return { ...this.user };
  }

  getAllUsers() {
    const unitRef = collection(this.firestore, 'users');
    return collectionData(unitRef, {
      idField: 'id'
    }) as Observable < any > ;
  }

  isAuth() {
    return this.user != null;
  }
}
