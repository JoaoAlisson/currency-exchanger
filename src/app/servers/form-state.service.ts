import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormStateService {

  public ammount: FormControl = new FormControl(null, [Validators.required, Validators.min(0)]);
  public from: FormControl = new FormControl(null, Validators.required);
  public to: FormControl = new FormControl(null, Validators.required);

  public form: FormGroup = new FormGroup({
    ammount: this.ammount,
    from: this.from,
    to: this.to,
  });

  public convert$ = new ReplaySubject();

  constructor() { }
}
