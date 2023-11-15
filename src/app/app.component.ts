import { Component } from '@angular/core';
import { MotherService } from './shares/services/main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ForecastChannel';
  constructor(private readonly motherservice: MotherService) {}

  ngOninit(): void {
    this.motherservice.initializeApp();
  }
}
