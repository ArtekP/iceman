import {
  Injectable
} from '@angular/core';
import {
  user
} from '@angular/fire/auth';
import {
  doc,
  docData,
  Firestore,
  getDoc,
  setDoc
} from '@angular/fire/firestore';
import {
  ToastrService
} from 'ngx-toastr';
import {
  from,
  Observable,
  of,
  Subject
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IcecreamService {
  favouritesSubject = new Subject < Observable < any >> ();
  constructor(private firestore: Firestore, private toast: ToastrService) {}

  addIcecream(newIcecream: string) {
    const docRef = doc(this.firestore, 'icecream/wmwFhLjUICxuRm77VfPf');
    getDoc(docRef).then(res => {
      let docData: any;
      docData = res.data();
      docData.types.push(newIcecream)
      console.log(docData);
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
    let mailFromLocalStorage = localStorage.getItem('email');
    let userData: any;
    const docRef = doc(this.firestore, 'users/F8qCwjDaIe2xpvcsNukP');
    (docData(docRef) as Observable < any > ).subscribe((docData) => {
      userData = docData.users.filter((x: any) => x.email === mailFromLocalStorage);
      this.favouritesSubject.next(userData[0].favourites);
    })
    // let mailFromLocalStorage = localStorage.getItem('email');
    // let userData: any;
    // const docRef = doc(this.firestore, 'users/F8qCwjDaIe2xpvcsNukP');
    // (docData(docRef) as Observable < any > ).subscribe((docData) => {
    //   userData = docData.users.filter((x: any) => x.email === mailFromLocalStorage);
    //   val.subscribe((data) => {userData[0].favourites});

    // })
  }

  getUnits() {

  }
}
