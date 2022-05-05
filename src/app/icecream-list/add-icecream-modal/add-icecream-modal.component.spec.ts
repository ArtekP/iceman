import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIcecreamModalComponent } from './add-icecream-modal.component';

describe('AddIcecreamModalComponent', () => {
  let component: AddIcecreamModalComponent;
  let fixture: ComponentFixture<AddIcecreamModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddIcecreamModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIcecreamModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
