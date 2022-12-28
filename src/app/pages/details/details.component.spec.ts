import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ApiService } from '../../servers/api.service';
import { FormStateService } from '../../servers/form-state.service';

import { DetailsComponent } from './details.component';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let formState: FormStateService;
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ from: 'USD', to: 'EUR' })
          }
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    formState = TestBed.inject(FormStateService);
    apiService = TestBed.inject(ApiService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set ammount 1 if is has no value', () => {
    expect(formState.ammount.value).toBe(1);
  });

  it('should set form value from params', () => {
    expect(formState.from.value).toBe('USD');
    expect(formState.to.value).toBe('EUR');
  });

  it('should set title', () => {
    // Arrange
    spyOn(apiService, 'getList').and.returnValue(of({
      currencies: {
        USD: 'Dollar',
        EUR: 'Euro',
        BRL: 'Reais'
      }
    }));

    // Action
    component.ngOnInit();

    // Assert
    expect(component.title).toBe('Dollar');
  });
});
