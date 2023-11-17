import { Component, OnInit } from '@angular/core';
import { Tomorrow } from 'src/app/shares/interfaces/weather.interface';
import { SessionDataService } from 'src/app/shares/services/session-data.service';
import { User } from 'src/app/shares/interfaces/user.interface';
import { PreviousRouteService } from 'src/app/shares/services/previous-route.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tomorrow',
  templateUrl: './tomorrow.component.html',
  styleUrls: ['./tomorrow.component.scss'],
})
export class TomorrowComponent implements OnInit {
  public Tomorrow$!: Observable<Tomorrow | undefined>;
  public User$!: Observable<User | undefined>;

  constructor(
    private readonly sessionDataService: SessionDataService,
    private readonly previousRouteService: PreviousRouteService
  ) {}

  ngOnInit(): void {
    this.Tomorrow$ = this.sessionDataService.getTomorrow$();
    this.User$ = this.sessionDataService.getUser$();
    this.previousRouteService.setLastUrl();
  }
}
