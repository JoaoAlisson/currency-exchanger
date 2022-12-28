import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ApiService } from '../../servers/api.service';
import { FormStateService } from '../../servers/form-state.service';

import { HistoricalRatesChartComponent } from './historical-rates-chart.component';

describe('HistoricalRatesChartComponent', () => {
  let component: HistoricalRatesChartComponent;
  let fixture: ComponentFixture<HistoricalRatesChartComponent>;
  let formState: FormStateService;
  let apiService: ApiService;

  beforeAll(() => {
    const date = new Date(2022, 1, 1);

    spyOn(window, 'Date').and.callFake(function () {
      return date;
    } as any);
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricalRatesChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricalRatesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    formState = TestBed.inject(FormStateService);
    apiService = TestBed.inject(ApiService);
  });

  beforeEach(() => {
    spyOn(apiService, 'getList').and.returnValue(of({
      currencies: {
        USD: 'Dollar',
        EUR: 'Euro',
        BRL: 'Reais'
      }
    }));

    spyOn(apiService, 'getHistorical').and.returnValue(of(
      [1,2,3,4,5,6,7,8,9,10,11,12]
    ));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load from description and data', () => {
    // Action
    formState.from.setValue('USD');

    // Assert
    expect(component.fromCurrencyDescription).toBe('USD - Dollar | Year: 2021');
    expect(component.fromChartData).toEqual([1,2,3,4,5,6,7,8,9,10,11,12]);
  });

  it('should load to description and data', () => {
    // Action
    formState.to.setValue('EUR');

    // Assert
    expect(component.toCurrencyDescription).toBe('EUR - Euro | Year: 2021');
    expect(component.toChartData).toEqual([1,2,3,4,5,6,7,8,9,10,11,12]);
  });
});
