import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ApiService } from '../../servers/api.service';
import { FormStateService } from '../../servers/form-state.service';

import { PopularCurrenciesGridComponent } from './popular-currencies-grid.component';

describe('PopularCurrenciesGridComponent', () => {
  let component: PopularCurrenciesGridComponent;
  let fixture: ComponentFixture<PopularCurrenciesGridComponent>;
  let formState: FormStateService;
  let apiService: ApiService;

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

    formState = TestBed.inject(FormStateService);
    apiService = TestBed.inject(ApiService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get currencies on convert observable emmit next', () => {
    // Arrange
    spyOn(apiService, 'getLive').and.returnValue(of({
      quotes: {
        USDBRL: 5.218977,
        USDEUR: 0.94005,
        USDUSD: 1
      },
      source: "USD",
      success: true,
      timestamp: 1672093503
    }));

    formState.from.setValue('USD');

    component.ngOnInit();

    // Action
    formState.convert$.next(true);

    // Assert
    expect(component.currencies).toEqual([
      { currency: 'USD', value: 0 },
      { currency: 'EUR', value: 0 },
      { currency: 'BRL', value: 0 },
      { currency: 'USD', value: 0 },
      { currency: 'EUR', value: 0 },
      { currency: 'BRL', value: 0 },
      { currency: 'USD', value: 0 },
      { currency: 'EUR', value: 0 },
      { currency: 'BRL', value: 0 },
    ]);
  });
});
