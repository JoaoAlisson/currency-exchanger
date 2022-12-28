import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormStateService } from '../../servers/form-state.service';

import { ConvertPanelComponent } from './convert-panel.component';

describe('ConvertPanelComponent', () => {
  let component: ConvertPanelComponent;
  let fixture: ComponentFixture<ConvertPanelComponent>;
  let formState: FormStateService;

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
});
