import { Component, OnInit } from '@angular/core';
import { FormStateService } from '../../servers/form-state.service';

@Component({
  selector: 'app-convert-panel',
  templateUrl: './convert-panel.component.html',
  styleUrls: ['./convert-panel.component.scss']
})
export class ConvertPanelComponent implements OnInit {

  constructor(public formState: FormStateService) { }

  // TODO: implementation
  public ngOnInit(): void {
  }

  // TODO: implementation
  public convert(): void {

  }

  public changeCurrencies(): void {
    const from = this.formState.from.value;
    const to = this.formState.to.value;

    this.formState.from.setValue(to);
    this.formState.to.setValue(from);
  }
}
