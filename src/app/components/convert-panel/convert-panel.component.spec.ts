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

});
