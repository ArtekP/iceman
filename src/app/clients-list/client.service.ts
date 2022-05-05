import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private firestore: Firestore) { }

  getClientsList() {
    const unitRef = collection(this.firestore, 'users');
    return collectionData(unitRef, {
      idField: 'id'
    }) as Observable < any > ;
  }
}
