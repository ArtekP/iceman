import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { doc, getDoc } from 'firebase/firestore';
import { Observable, of, Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { AppState } from '../store/app.state';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {
  userId!: string;
  userName$ = new Subject<any>();
  hasOrderedToday$!: Observable<boolean>;
  hasEverOrdered$!: Observable<boolean>;

  constructor(private router: Router, private store: Store<AppState>, private authService: AuthService, private firestore: Firestore) { }

  ngOnInit(): void {
    this.getUserName();
    this.hasEverOrdered$ = this.store.select(state => state.order.hasEverOrdered);
    this.hasOrderedToday$ = this.store.select(state => state.order.hasOrderedToday);
  }

  getUserName() {
    this.userId = this.authService.userId;
    const userRef = doc(this.firestore, `users/${this.userId}`);
    getDoc(userRef).then(res => {
      let docData: any;
      docData = res.data();
      this.userName$.next(docData.name)
    });
  }

  onIcecreamListClick() {
    this.router.navigate(['/icecream-list'])
  }

  onOrderListClick() {
    this.router.navigate(['/order-client'])
  }

  onOrderSameIcrecreamAgain() {
    
  }

}
