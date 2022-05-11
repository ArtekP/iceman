import {
  Injectable
} from '@angular/core';
import {
  collection,
  collectionData,
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
  map,
  switchMap,
  tap
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class IcecreamService {
  public userId!: string;
  checkIfIcecreamStillExist!: string[];

  constructor(
    private firestore: Firestore,
    private toast: ToastrService
  ) {}

  public getIcecreamList() {
    const icecreamRef = collection(this.firestore, 'icecream');
    return (collectionData(icecreamRef, {
      idField: 'wmwFhLjUICxuRm77VfPf'
    })).pipe(
      map(data => data[0]['types']),
      tap(data => this.checkIfIcecreamStillExist = data),
    );
  }

  public addIcecream(newIcecream: string) {
    const docRef = doc(this.firestore, 'icecream/wmwFhLjUICxuRm77VfPf');
    getDoc(docRef).then(res => {
      let docData = res.data() !;
      if(!docData['types'].includes(newIcecream.toLocaleLowerCase())) {
        docData['types'].push(newIcecream)
        setDoc(docRef, docData);
        this.toast.success(`Dodano pozycję o nazwie "${newIcecream}"`)
      } else {
        this.toast.error('Taka pozycja już jest na liście!')
        return
      }
    });
  }

  public deleteIcecream(icecream: string) {
    const docRef = doc(this.firestore, 'icecream/wmwFhLjUICxuRm77VfPf');
    getDoc(docRef).then(res => {
      let docData = res.data() !;
      let i = docData['types'].indexOf(icecream);
      docData['types'].splice(i, 1);
      setDoc(docRef, docData);
      this.toast.success(`Usunięto pozycję "${icecream}"`)
    });
  }

  public getFavouritesFromDB() {
    const icecreamRef = collection(this.firestore, 'icecream');
    return collectionData(icecreamRef, {
      idField: 'wmwFhLjUICxuRm77VfPf'
    }).pipe(
      map(data => data[0]['types']),
      switchMap(allIcecream => {
        this.userId = localStorage.getItem('uid') !;
        const userRef = doc(this.firestore, `users/${this.userId}`);
        return docData(userRef).pipe(
          map(user => user['favourites']),
          map(favIcecream => favIcecream.filter((favItem: string) => allIcecream.includes(favItem))),
        )
      })
    )
  }

  public addToFavourites(icecream: string) {
    this.userId = localStorage.getItem('uid') !;
    const userRef = doc(this.firestore, `users/${this.userId}`);

    getDoc(userRef).then(res => {
      let docData = res.data() !;
      if (docData['favourites'].indexOf(icecream) >= 0) {
        this.toast.info(`Pozycja '${icecream}' już znajduje się na liście ulubionych.`)
        return;
      } else {
        docData['favourites'] = [...docData['favourites'], icecream];
        setDoc(userRef, docData);
        this.toast.success(`Dodano lody ${icecream} do ulubionych!`)
      }
    });
  }

  public removeFromFav(icecreamName: string) {
    this.userId = localStorage.getItem('uid') !;
    const userRef = doc(this.firestore, `users/${this.userId}`);

    getDoc(userRef).then(res => {
      let docData = res.data() !;
      let index = docData['favourites'].indexOf(icecreamName);
      docData['favourites'].splice(index, 1);
      setDoc(userRef, docData);
      this.toast.success(`Pozycja ${icecreamName} została usunięta z ulubionych`)
    })
  }
}
