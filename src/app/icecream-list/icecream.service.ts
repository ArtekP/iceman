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
  ToastrService
} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class IcecreamService {
  userId!: string;

  constructor(private firestore: Firestore, private toast: ToastrService) {}

  addIcecream(newIcecream: string) {
    const docRef = doc(this.firestore, 'icecream/wmwFhLjUICxuRm77VfPf');
    getDoc(docRef).then(res => {
      let docData = res.data()!;
      docData['types'].push(newIcecream)
      setDoc(docRef, docData);
      this.toast.success(`Dodano pozycję o nazwie "${newIcecream}"`)
    });
  }

  deleteIcecream(icecream: string) {
    const docRef = doc(this.firestore, 'icecream/wmwFhLjUICxuRm77VfPf');
    getDoc(docRef).then(res => {
      let docData = res.data()!;
      let i = docData['types'].indexOf(icecream);
      docData['types'].splice(i, 1);
      setDoc(docRef, docData);
      this.toast.success(`Usunięto pozycję "${icecream}"`)
    });
  }

  addToFavourites(icecream: string) {
    this.userId = localStorage.getItem('uid')!;
    const userRef = doc(this.firestore, `users/${this.userId}`);

    getDoc(userRef).then(res => {
      let docData = res.data()!;
      if(docData['favourites'].indexOf(icecream) >= 0) {
        this.toast.info(`Pozycja '${icecream}' już znajduje się na liście ulubionych.`)
        return;
      } else {
        docData['favourites'] = [...docData['favourites'], icecream];
        setDoc(userRef, docData);
        this.toast.success(`Dodano lody ${icecream} do ulubionych!`)
      }
    });
  }

  getFavouritesFromDB() {
    this.userId = localStorage.getItem('uid')!;
    const userRef = doc(this.firestore, `users/${this.userId}`);
    return docData(userRef)
  }
}
