import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcecreamListComponent } from './icecream-list.component';

describe('IcecreamListComponent', () => {
  let component: IcecreamListComponent;
  let fixture: ComponentFixture<IcecreamListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IcecreamListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IcecreamListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
