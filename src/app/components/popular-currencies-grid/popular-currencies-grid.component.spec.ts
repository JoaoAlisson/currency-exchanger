import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularCurrenciesGridComponent } from './popular-currencies-grid.component';

describe('PopularCurrenciesGridComponent', () => {
  let component: PopularCurrenciesGridComponent;
  let fixture: ComponentFixture<PopularCurrenciesGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopularCurrenciesGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularCurrenciesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
