import { ChangeDetectorRef, Component } from '@angular/core';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ForecastChannel';

  constructor() {}
}
