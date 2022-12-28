import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormStateService } from '../../servers/form-state.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  constructor(private formState: FormStateService, private route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.route.params.subscribe(({ from, to }) => {
      if(!this.formState.ammount.value) {
        this.formState.ammount.setValue(1);
      }

      this.formState.from.setValue(from);
      this.formState.to.setValue(to);
    });
  }
}
