import { Component, OnInit } from '@angular/core';
import { SessionDataService } from 'src/app/shares/services/session-data.service';
import { PreviousRouteService } from 'src/app/shares/services/previous-route.service';
import { Current, Day } from 'src/app/shares/interfaces/weather.interface';
import { User } from 'src/app/shares/interfaces/user.interface';
import { Observable } from 'rxjs';
import { IconService } from 'src/app/shares/services/icon.service';
@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss'],
})
export class CurrentComponent implements OnInit {
  public Current$!: Observable<Current | undefined>;
  public User$!: Observable<User | undefined>;
  public Day$!: Observable<Day | undefined>;

  constructor(
    private readonly sessionDataService: SessionDataService,
    private iconService: IconService,
    private readonly previousRouteService: PreviousRouteService
  ) {}

  public getIcon(description: string, day: Day): string {
    return this.iconService.getIcon(description, day);
  }

  ngOnInit(): void {
    this.Current$ = this.sessionDataService.getCurrent$();
    this.User$ = this.sessionDataService.getUser$();
    this.Day$ = this.sessionDataService.getDay$();
    this.previousRouteService.setLastUrl();
  }
}
