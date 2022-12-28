import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getList', () => {
    const mockList = {
      currencies: {
        USD: 'Dollar',
        EUR: 'Euro',
        BRL: 'Reais'
      }
    };

    it('should call api to get list if is not on localStorage', () => {
      // Arrange
      localStorage.removeItem('currencyList');

      // Action
      service.getList().subscribe(response => {
        // Assert
        expect(response).toEqual(mockList);
      });

      // Assert
      const req = http.expectOne('https://api.apilayer.com/currency_data/list');
      expect(req.request.method).toBe('GET');
      req.flush(mockList);
    });

    it('should not call api to get list if is on localStorage', () => {
      // Arrange
      localStorage.setItem('currencyList', JSON.stringify(mockList));

      // Action
      service.getList().subscribe(response => {
        // Assert
        expect(response).toEqual(mockList);
      });

      // Assert
      http.expectNone('https://api.apilayer.com/currency_data/list');
    });
  });

  it('should call convert api', () => {
    const mockResponse = {
      success: true,
      query: {
          from: 'USD',
          to: 'EUR',
          amount: 132
      },
      info: {
          timestamp: 123,
          quote: 12
      },
      result: 123
    };

    // Action
    service.getConvert(1, 'USD', 'EUR').subscribe(response => {
      // Assert
      expect(response).toEqual(mockResponse);
    });

    // Assert
    const req = http.expectOne('https://api.apilayer.com/currency_data/convert?from=USD&to=EUR&amount=1');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should call live api', () => {
    const mockResponse = {
      quotes: {
        USDBRL: 5.218977,
        USDEUR: 0.94005,
        USDUSD: 1
      },
      source: "USD",
      success: true,
      timestamp: 1672093503
    };

    // Action
    service.getLive('USD', ['EUR', 'BRL']).subscribe(response => {
      // Assert
      expect(response).toEqual(mockResponse);
    });

    // Assert
    const req = http.expectOne('https://api.apilayer.com/currency_data/live?source=USD&currencies=EUR,BRL');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
