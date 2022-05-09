import {
  Injectable
} from '@angular/core';
import {
  collection,
  collectionData,
  doc,
  Firestore,
  getDoc,
  setDoc
} from '@angular/fire/firestore';
import {
  ToastrService
} from 'ngx-toastr';
import {
  map,
  Observable
} from 'rxjs';
import {
  Unit
} from '../../shared/models/unit.model';

@Injectable({
  providedIn: 'root'
})

export class UnitService {
  constructor(private toast: ToastrService, private firestore: Firestore) {}

  public getUnitList() {
    const unitRef = collection(this.firestore, 'units');
    return (collectionData(unitRef, {
      idField: 'LpGsBGjbLxaLJqmL698E'
    })).pipe(
      map(units => {
        units = units[0]['units'].sort(function (a: Unit, b: Unit) {
          return +a.capacity > +b.capacity;
        });
        return units;
      })
    ) as Observable < Unit[] > ;
  }

  public addUnit(newUnit: Unit) {
    const docRef = doc(this.firestore, 'units/LpGsBGjbLxaLJqmL698E');
    getDoc(docRef).then(res => {
      let docData = res.data() !;
      if ((docData['units'].filter((unit: Unit) => unit.name == newUnit.name)).length > 0) {
        this.toast.error('Pojemnik o danej nazwie już istnieje!')
        return;
      } else {
        docData['units'].push(newUnit);
        setDoc(docRef, docData);
        this.toast.success(`Dodano pozycję: "${newUnit.name}"`)
      }
    });
  }

  public deleteUnit(unitName: string) {
    const docRef = doc(this.firestore, 'units/LpGsBGjbLxaLJqmL698E');
    getDoc(docRef).then(res => {
      let docData = res.data()!;
      let index = docData['units'].map((unit: Unit) => unit.name).indexOf(unitName);
      docData['units'].splice(index, 1)
      setDoc(docRef, docData);
      this.toast.success(`Usunięto ${unitName} z listy`)
    });
  }
}
