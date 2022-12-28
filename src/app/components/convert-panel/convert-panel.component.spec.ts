import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ConvertResponse } from '../../models/api.models';
import { ApiService } from '../../servers/api.service';
import { FormStateService } from '../../servers/form-state.service';

import { ConvertPanelComponent } from './convert-panel.component';

describe('ConvertPanelComponent', () => {
  let component: ConvertPanelComponent;
  let fixture: ComponentFixture<ConvertPanelComponent>;
  let formState: FormStateService;
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConvertPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvertPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    formState = TestBed.inject(FormStateService);
    apiService = TestBed.inject(ApiService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change currencies on from and to selects', () => {
    // Arrange
    formState.from.setValue('USD');
    formState.to.setValue('EUR');

    // Action
    component.changeCurrencies();

    // Assert
    expect(formState.from.value).toBe('EUR');
    expect(formState.to.value).toBe('USD');
  });

  describe('convert', () => {
    it('should not convert if form is not valid', () => {
      // Arrange
      spyOn(apiService, 'getConvert').and.returnValue(of({ result: 123 } as ConvertResponse));

      // Action
      component.convert();

      // Assert
      expect(apiService.getConvert).not.toHaveBeenCalled();
      expect(component.result).not.toBe(123);
    });

    it('should set result on convert function if form is valid', () => {
      // Arrange
      spyOn(apiService, 'getConvert').and.returnValue(of({ result: 123 } as ConvertResponse));

      formState.ammount.setValue(10.1);
      formState.from.setValue('USD');
      formState.to.setValue('EUR');

      // Action
      component.convert();

      // Assert
      expect(component.result).toBe(123);
    });
  });

  it('should load currencies list', () => {
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
    expect(component.currencies).toEqual([
      { value: 'USD', description: 'Dollar' },
      { value: 'EUR', description: 'Euro' },
      { value: 'BRL', description: 'Reais' }
    ]);
  });

  it('should set unity value on change currencies values', () => {
    // Arrange
    spyOn(apiService, 'getConvert').and.returnValue(of({ result: 123 } as ConvertResponse));

    component.ngOnInit();

    // Action
    formState.from.setValue('USD');
    formState.to.setValue('EUR');

    // Assert
    expect(component.unity).toBe(123);
  });

  it('should convert value if form is valid on component init', () => {
    // Arrange
    spyOn(apiService, 'getConvert').and.returnValue(of({ result: 123 } as ConvertResponse));

    formState.ammount.setValue(2);
    formState.from.setValue('USD');
    formState.to.setValue('EUR');

    // Action
    component.ngOnInit();

    // Assert
    // first time on convert function
    expect(apiService.getConvert).toHaveBeenCalledWith(2, 'USD', 'EUR');

    // second time on setUnityValue function
    expect(apiService.getConvert).toHaveBeenCalledWith(1, 'USD', 'EUR');
  });
});
