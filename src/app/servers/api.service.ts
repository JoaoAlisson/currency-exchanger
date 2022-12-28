import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, of, tap } from 'rxjs';
import { ConvertResponse, ListResponse, LiveResponse } from '../models/api.models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'https://api.apilayer.com/currency_data';

  constructor(private http: HttpClient) { }

  /*
  * get currency list from api and set in localStorage on the first time
  * if list is on localStorage don't call api
  */
  public getList(): Observable<ListResponse> {
    const listString = localStorage.getItem('currencyList');

    return listString
      ? of(JSON.parse(listString))
      : this.http.get<ListResponse>(`${this.baseUrl}/list`).pipe(
          tap((list: any) => {
            localStorage.setItem('currencyList', JSON.stringify(list));
          })
        );
  }

  public getConvert(amount: number, from: string, to: string): Observable<ConvertResponse> {
    const params = new HttpParams({ fromObject: {
      from, to, amount: amount.toString()
    }});

    return this.http.get<ConvertResponse>(`${this.baseUrl}/convert`, { params });
  }

  public getLive(source: string, currencies: string[]): Observable<LiveResponse> {
    const params = new HttpParams({ fromObject: {
      source,
      currencies: currencies.join(',')
    }});

    return this.http.get<LiveResponse>(`${this.baseUrl}/live`, { params });
  }

  public getYearHistorical(source: string, year: number): Observable<number[]> {
    const days: string[] = [];

    // Use one currency as referency
    const sourceReference = source === 'USD' ? 'EUR' : 'USD';

    let observables: {[key:string]: Observable<any>} = {};

    // for each last day of month
    for(let month = 0; month < 12; month++) {
      const lastDay = new Date(year, month + 1, 0);

      const formatZero = (val: number) => {
        return val < 10 ? `0${val}` : val;
      }

      // format day as 2022-01-01
      const dayString: string = `${lastDay.getFullYear()}-${formatZero(lastDay.getMonth() + 1)}-${formatZero(lastDay.getDate())}`;

      days.push(dayString);

      const observable = this.getHistorical(dayString, sourceReference, [source]);

      observables[dayString] = observable;
    }

    return forkJoin(observables).pipe(map(response => {
      const values: number[] = [];

      days.forEach(day => {
        const dayResponse = response[day];

        values.push(dayResponse.quotes[`${sourceReference}${source}`]);
      });

      const firstValue = values[0];

      return values.map(value => {
        // on first value return 1
        if(firstValue === value) {
          return 1;
        }

        // calculate others values base on first value
        const relativeValue = value / firstValue;

        return Number.parseFloat(relativeValue.toFixed(2));
      });
    }));
  }

  public getHistorical(date: string, source: string, currencies: string[]): Observable<LiveResponse> {
    const params = new HttpParams({ fromObject: {
      date,
      source,
      currencies: currencies.join(',')
    }});

    return this.http.get<LiveResponse>(`${this.baseUrl}/historical`, { params });
  }
}
