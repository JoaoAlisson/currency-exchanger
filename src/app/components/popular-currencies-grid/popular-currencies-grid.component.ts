import { Component, OnDestroy, OnInit } from '@angular/core';
import { finalize, ReplaySubject, switchMap, takeUntil, tap } from 'rxjs';
import { MainCurrencies } from '../../models/api.models';
import { ApiService } from '../../servers/api.service';
import { FormStateService } from '../../servers/form-state.service';


const POPULAR_CURRENCIES: string[] = [
  MainCurrencies.USD,
  MainCurrencies.EUR,
  MainCurrencies.EGP,
  MainCurrencies.GBP,
  MainCurrencies.AED,
  MainCurrencies.BTC,
  MainCurrencies.BRL,
  MainCurrencies.YER,
  MainCurrencies.XAU,
];

@Component({
  selector: 'app-popular-currencies-grid',
  templateUrl: './popular-currencies-grid.component.html',
  styleUrls: ['./popular-currencies-grid.component.scss']
})
export class PopularCurrenciesGridComponent implements OnInit, OnDestroy {

  public loading = false;

  public currencies: { currency: string, value: number }[] = [];

  private destroyed$ = new ReplaySubject(1);

  constructor(private apiService: ApiService, private formState: FormStateService) { }

  public ngOnInit(): void {
    this.formState.convert$.asObservable().pipe(
      tap(() => {
        this.loading = true;
        this.currencies = [];
      }),
      switchMap(() => this.apiService.getLive(this.formState.from.value, POPULAR_CURRENCIES).pipe(
        finalize(() => {
          this.loading = false;
        }),
      )),
      takeUntil(this.destroyed$)
    ).subscribe(({ quotes }) => {
      POPULAR_CURRENCIES.forEach(currency => {
        const key = `${this.formState.from.value}${currency}`;

        const unityValue = quotes[key];
        const value = this.formState.ammount.value * unityValue;

        this.currencies.push({
          currency, value
        });
      });
    });
  }

  public ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
