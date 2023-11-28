import { Component, OnInit } from '@angular/core';
import { Day, Tomorrow } from 'src/app/shares/interfaces/weather.interface';
import { SessionDataService } from 'src/app/shares/services/session-data.service';
import { User } from 'src/app/shares/interfaces/user.interface';
import { PreviousRouteService } from 'src/app/shares/services/previous-route.service';
import { Observable } from 'rxjs';
import { IconService } from 'src/app/shares/services/icon.service';

@Component({
  selector: 'app-tomorrow',
  templateUrl: './tomorrow.component.html',
  styleUrls: ['./tomorrow.component.scss'],
})
export class TomorrowComponent implements OnInit {
  public Tomorrow$!: Observable<Tomorrow | undefined>;
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
    this.Tomorrow$ = this.sessionDataService.getTomorrow$();
    this.User$ = this.sessionDataService.getUser$();
    this.Day$ = this.sessionDataService.getDay$();
    this.previousRouteService.setLastUrl();
  }
}
