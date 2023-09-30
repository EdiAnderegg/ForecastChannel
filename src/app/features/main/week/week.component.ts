import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { weekArr } from 'src/app/shares/interfaces/weather.interface';
import { SessionDataService } from 'src/app/shares/services/session-data.service';
import { PreviousRouteService } from 'src/app/shares/services/previous-route.service';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss']
})
export class WeekComponent implements OnInit {

  public Week$!: Observable<weekArr | undefined>;

  constructor(private readonly sessionDataService: SessionDataService,
              private readonly previousRouteService : PreviousRouteService){}

  public isWeekend(weekDay: number): boolean{
    if(weekDay === 6 || weekDay === 0) return true;
    return false;
  }

  ngOnInit(): void {
    this.Week$ = this.sessionDataService.getWeek$();
    this.previousRouteService.setLastUrl();
  }
}
