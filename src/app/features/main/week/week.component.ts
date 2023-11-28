import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Day, weekArr } from 'src/app/shares/interfaces/weather.interface';
import { SessionDataService } from 'src/app/shares/services/session-data.service';
import { PreviousRouteService } from 'src/app/shares/services/previous-route.service';
import { IconService } from 'src/app/shares/services/icon.service';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss'],
})
export class WeekComponent implements OnInit {
  public Week$!: Observable<weekArr | undefined>;
  public Day$!: Observable<Day | undefined>;

  constructor(
    private readonly sessionDataService: SessionDataService,
    private iconService: IconService,
    private readonly previousRouteService: PreviousRouteService
  ) {}

  public isWeekend(weekDay: number): boolean {
    if (weekDay === 6 || weekDay === 0) return true;
    return false;
  }

  public getIcon(description: string, day: Day): string {
    return this.iconService.getIcon(description, day);
  }

  ngOnInit(): void {
    this.Week$ = this.sessionDataService.getWeek$();
    this.Day$ = this.sessionDataService.getDay$();
    this.previousRouteService.setLastUrl();
  }
}
