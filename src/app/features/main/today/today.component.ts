
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Current } from 'src/app/shares/interfaces/current.interface';
import { SessionDataService } from 'src/app/shares/services/session-data.service';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss']
})
export class TodayComponent implements OnInit {

  public Today$!: Observable<Current | undefined>;

  constructor(private readonly sessionDataService: SessionDataService) { }


  ngOnInit(): void {
    this.Today$ = this.sessionDataService.getWeather$();
  }

}
