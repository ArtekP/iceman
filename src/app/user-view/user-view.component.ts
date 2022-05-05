import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {
  userName!: string | null;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.userName = localStorage.getItem('name');
  }

  onIcecreamListClick() {
    this.router.navigate(['/icecream-list'])
  }

  onOrderListClick() {
    this.router.navigate(['/container-list'])
  }

}
