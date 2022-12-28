import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
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

  // TODO: implement and remove mock returns
  public getLive(source: string, currencies: string[]): Observable<LiveResponse> {
    return of({
      quotes: {
        USDBRL: 5.218977,
        USDEUR: 0.94005,
        USDUSD: 1
      },
      source: "USD",
      success: true,
      timestamp: 1672093503
    });
  }

  // TODO: implement and remove mock returns
  public getHistorical(source: string, currencies: string[], year: number): Observable<number[]> {
    return of([1,2,3,4,5,6,7,8,9,10,11,12]);
  }
}
