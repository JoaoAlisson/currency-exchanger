import { TestBed } from '@angular/core/testing';

import { ApilayerInterceptor } from './apilayer.interceptor';

describe('ApilayerInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ApilayerInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ApilayerInterceptor = TestBed.inject(ApilayerInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
