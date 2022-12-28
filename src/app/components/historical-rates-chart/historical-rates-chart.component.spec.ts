import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalRatesChartComponent } from './historical-rates-chart.component';

describe('HistoricalRatesChartComponent', () => {
  let component: HistoricalRatesChartComponent;
  let fixture: ComponentFixture<HistoricalRatesChartComponent>;

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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
