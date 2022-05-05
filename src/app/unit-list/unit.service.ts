import { Injectable } from '@angular/core';
import { doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Unit } from './unit.model';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  constructor(private toast: ToastrService, private firestore: Firestore) { }

  addUnit(newUnit: Unit) {
    const docRef = doc(this.firestore, 'units/LpGsBGjbLxaLJqmL698E');
    getDoc(docRef).then(res => {
      let docData: any;
      docData = res.data();
      if((docData.units.filter((x: any) => x.name == newUnit.name)).length > 0) {
        this.toast.error('Pojemnik o danej nazwie już istnieje!')
        return;
      } else {
        docData.units.push(newUnit);
        setDoc(docRef, docData);
        this.toast.success(`Dodano pozycję: "${newUnit.name}"`)
      }
    });
  }

  deleteUnit(unit: Unit) {
    const docRef = doc(this.firestore, 'units/LpGsBGjbLxaLJqmL698E');
    getDoc(docRef).then(res=> {
      let docData: any;
      docData = res.data()
      docData.units = docData.units.filter((x: Unit) => x.name != unit.name);
      setDoc(docRef, docData);
      this.toast.success(`Usunięto pozycję: "${unit.name}"`)
    });
  }

}
