import {
  Injectable
} from '@angular/core';
import {
  doc,
  docData,
  Firestore,
  getDoc,
  setDoc
} from '@angular/fire/firestore';
import {
  Store
} from '@ngrx/store';
import {
  ToastrService
} from 'ngx-toastr';
import {
  Observable,
  Subject
} from 'rxjs';
import { AuthService } from '../auth/auth.service';
import {
  AppState
} from '../store/app.state';

@Injectable({
  providedIn: 'root'
})
export class IcecreamService {
  userId!: string;
  userInfo$!: Observable < any > ;

  constructor(private firestore: Firestore, private toast: ToastrService, private store: Store < AppState >, private authService: AuthService ) {}

  ngOnInit() {
  }

  addIcecream(newIcecream: string) {
    const docRef = doc(this.firestore, 'icecream/wmwFhLjUICxuRm77VfPf');
    getDoc(docRef).then(res => {
      let docData: any;
      docData = res.data();
      docData.types.push(newIcecream)
      // console.log(docData);
      setDoc(docRef, docData);
      this.toast.success(`Dodano pozycję o nazwie "${newIcecream}"`)
    });
  }

  deleteIcecream(icecream: string) {
    const docRef = doc(this.firestore, 'icecream/wmwFhLjUICxuRm77VfPf');
    getDoc(docRef).then(res => {
      let docData: any;
      docData = res.data();
      let i = docData.types.indexOf(icecream);
      docData.types.splice(i, 1)
      setDoc(docRef, docData);
      this.toast.success(`Usunięto pozycję "${icecream}"`)
    });
  }

  addToFavourites(icecream: string) {
    let mailFromLocalStorage = localStorage.getItem('email');
    const docRef = doc(this.firestore, 'users/F8qCwjDaIe2xpvcsNukP');
    getDoc(docRef).then(res => {
      let docData: any;
      docData = res.data();
      let index = docData.users.findIndex((x: any) => x.email == mailFromLocalStorage)
      if (docData.users[index].favourites.indexOf(icecream) >= 0) {
        return;
      } else {
        docData.users[index].favourites = [...docData.users[index].favourites, icecream]
        setDoc(docRef, docData);
      }
    });
  }

  getFavouritesFromDB() {
    this.userId = this.authService.userId;
    const userRef = doc(this.firestore, `users/${this.userId}`);
    return docData(userRef)
  }

  getUnits() {

  }
}
