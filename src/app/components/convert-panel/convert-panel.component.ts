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
}
