import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { weekArr } from 'src/app/shares/interfaces/weather.interface';
import { SessionDataService } from 'src/app/shares/services/session-data.service';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss']
})
export class WeekComponent implements OnInit {

  public Week$!: Observable<weekArr | undefined>;

  constructor(private readonly sessionDataService: SessionDataService){}

  ngOnInit(): void {
    this.Week$ = this.sessionDataService.getWeek$();
  }
}
