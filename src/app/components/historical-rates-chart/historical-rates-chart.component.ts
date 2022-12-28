import { Component, OnInit } from '@angular/core';
import { Observable, of, switchMap, tap } from 'rxjs';
import { ApiService } from '../../servers/api.service';
import { FormStateService } from '../../servers/form-state.service';
@Component({
  selector: 'app-historical-rates-chart',
  templateUrl: './historical-rates-chart.component.html',
  styleUrls: ['./historical-rates-chart.component.scss']
})
export class HistoricalRatesChartComponent implements OnInit {

  public fromChartData: number[] = [];
  public toChartData: number[] = [];

  public fromCurrencyDescription = '';
  public toCurrencyDescription = '';

  private previousYear: number | null = null;

  constructor(public formState: FormStateService, private apiService: ApiService) { }

  public ngOnInit(): void {
    this.previousYear = (new Date()).getFullYear() - 1;

    this.updateFromData(of(this.formState.from.value));

    this.updateToData(of(this.formState.to.value));

    this.updateFromData(this.formState.from.valueChanges);

    this.updateToData(this.formState.to.valueChanges);
  }

  private updateFromData(observable: Observable<string>): void {
    let currency: string;

    observable.pipe(
      tap(value => {
        currency = value;
        this.fromChartData = [];
      }),
      switchMap(() => this.apiService.getList()),
      tap(({ currencies }) => {
        this.fromCurrencyDescription = `${currency} - ${currencies[currency]} | Year: ${this.previousYear}`;
      }),
      switchMap(() => this.apiService.getYearHistorical(currency, this.previousYear as number))
    ).subscribe(data => {
      this.fromChartData = data;
    });
  }

  private updateToData(observable: Observable<string>): void {
    let currency: string;

    observable.pipe(
      tap(value => {
        currency = value;
        this.toChartData = [];
      }),
      switchMap(() => this.apiService.getList()),
      tap(({ currencies }) => {
        this.toCurrencyDescription = `${currency} - ${currencies[currency]} | Year: ${this.previousYear}`;
      }),
      switchMap(() => this.apiService.getYearHistorical(currency, this.previousYear as number))
    ).subscribe(data => {
      this.toChartData = data;
    });
  }
}
