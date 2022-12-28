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
});
