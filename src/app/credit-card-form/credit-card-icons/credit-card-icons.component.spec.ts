import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardIconsComponent } from './credit-card-icons.component';

describe('CreditCardIconsComponent', () => {
  let component: CreditCardIconsComponent;
  let fixture: ComponentFixture<CreditCardIconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditCardIconsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditCardIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
