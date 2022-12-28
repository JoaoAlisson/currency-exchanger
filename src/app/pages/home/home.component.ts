import { Component } from '@angular/core';
import { FormStateService } from '../../servers/form-state.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(public formState: FormStateService) { }
}
