import { HttpClientTestingModule } from '@angular/common/http/testing';
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
      imports: [HttpClientTestingModule],
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
        USDUSD: 1,
        USDEUR: 0.94005,
        USDEGP: 0,
        USDGBP: 0,
        USDAED: 0,
        USDBTC: 0,
        USDBRL: 0,
        USDYER: 0,
        USDXAU: 0
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
      { currency: 'EGP', value: 0 },
      { currency: 'GBP', value: 0 },
      { currency: 'AED', value: 0 },
      { currency: 'BTC', value: 0 },
      { currency: 'BRL', value: 0 },
      { currency: 'YER', value: 0 },
      { currency: 'XAU', value: 0 },
    ]);
  });
});
