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
import {
  AuthService
} from '../auth/auth.service';
import {
  AppState
} from '../store/app.state';

@Injectable({
  providedIn: 'root'
})
export class IcecreamService {
  userId!: string;
  userInfo$!: Observable < any > ;

  constructor(private firestore: Firestore, private toast: ToastrService, private store: Store < AppState > , private authService: AuthService) {}

  ngOnInit() {}

  addIcecream(newIcecream: string) {
    const docRef = doc(this.firestore, 'icecream/wmwFhLjUICxuRm77VfPf');
    getDoc(docRef).then(res => {
      let docData: any;
      docData = res.data();
      docData.types.push(newIcecream)
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
      docData.types.splice(i, 1);
      setDoc(docRef, docData);
      this.toast.success(`Usunięto pozycję "${icecream}"`)
    });
  }

  addToFavourites(icecream: string) {
    this.userId = this.authService.userId;
    const userRef = doc(this.firestore, `users/${this.userId}`);

    getDoc(userRef).then(res => {
      let docData: any;
      docData = res.data();
      if(docData.favourites.indexOf(icecream) >= 0) {
        this.toast.info(`Pozycja '${icecream}' już znajduje się na liście ulubionych.`)
        return;
      } else {
        docData.favourites = [...docData.favourites, icecream];
        setDoc(userRef, docData);
        this.toast.success(`Dodano lody ${icecream} do ulubionych!`)
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
