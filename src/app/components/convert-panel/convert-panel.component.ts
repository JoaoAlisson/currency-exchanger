import { Component, OnInit } from '@angular/core';
import { combineLatest, finalize, switchMap, tap } from 'rxjs';
import { ApiService } from '../../servers/api.service';
import { FormStateService } from '../../servers/form-state.service';

@Component({
  selector: 'app-convert-panel',
  templateUrl: './convert-panel.component.html',
  styleUrls: ['./convert-panel.component.scss']
})
export class ConvertPanelComponent implements OnInit {

  public result: number | null = null;

  public unity: number | null = null;

  public currencies: { value: string, description: string }[] = [];

  constructor(public formState: FormStateService, private apiService: ApiService) { }

  public ngOnInit(): void {
    this.loadCurrenciesList();

    this.setUnityValueOnCurrenciesChanges();
  }

  public convert(): void {
    if(this.formState.form.valid) {
      this.result = null;

      this.apiService.getConvert(this.formState.ammount.value, this.formState.from.value, this.formState.to.value)
        .subscribe(({ result }) => {
          this.result = result;
        });
    }
  }

  public changeCurrencies(): void {
    const from = this.formState.from.value;
    const to = this.formState.to.value;

    this.formState.from.setValue(to);
    this.formState.to.setValue(from);
  }

  private loadCurrenciesList(): void {
    this.apiService.getList().subscribe(({ currencies }) => {
      this.currencies = Object.entries(currencies).map(([value, description]) => ({
        value, description
      }));
    });
  }

  private setUnityValueOnCurrenciesChanges(): void {
    combineLatest({
      from: this.formState.from.valueChanges,
      to: this.formState.to.valueChanges
    }).pipe(
        tap(() => {
          this.unity = null;
        }),
        switchMap(({ from, to }) => this.apiService.getConvert(1, from, to)),
        tap(({ result }) => {
          this.unity = result;
        })
      ).subscribe();
  }
}
