import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ConvertResponse, ListResponse, LiveResponse } from '../models/api.models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  // TODO: implement and remove mock returns
  public getList(): Observable<ListResponse> {
    return of({
      currencies: {
        USD: 'Dollar',
        EUR: 'Euro',
        BRL: 'Reais'
      }
    });
  }

  // TODO: implement and remove mock returns
  public getConvert(amount: number, from: string, to: string): Observable<ConvertResponse> {
    return of({
      success: true,
      query: {
          from,
          to,
          amount: 132
      },
      info: {
          timestamp: 123,
          quote: 12
      },
      result: 123
    });
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
