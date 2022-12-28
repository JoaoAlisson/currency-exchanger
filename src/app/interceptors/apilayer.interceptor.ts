import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

const API_KEY = 'rzccQMZkpP4r5YazI0ejnxdV09ksoCU4';

@Injectable()
export class ApilayerInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const request = req.clone({
      body: { redirect: 'follow' },
      headers: req.headers.set('apikey', API_KEY)
    });

    return next.handle(request);
  }
}
