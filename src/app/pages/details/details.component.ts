import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../servers/api.service';
import { FormStateService } from '../../servers/form-state.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  public title = '';

  constructor(private formState: FormStateService,
    private route: ActivatedRoute,
    private apiService: ApiService) { }

  public ngOnInit(): void {
    this.route.params.subscribe(({ from, to }) => {
      if(!this.formState.ammount.value) {
        this.formState.ammount.setValue(1);
      }

      this.formState.from.setValue(from);
      this.formState.to.setValue(to);

      this.setTitle();
    });
  }

  private setTitle(): void {
    this.apiService.getList().subscribe(({ currencies }) => {
      this.title = currencies[this.formState.from.value];
    });
  }
}
