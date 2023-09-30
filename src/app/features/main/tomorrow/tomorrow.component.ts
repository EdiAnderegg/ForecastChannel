import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Tomorrow } from 'src/app/shares/interfaces/weather.interface';
import { SessionDataService } from 'src/app/shares/services/session-data.service';
import { PreviousRouteService } from 'src/app/shares/services/previous-route.service';

@Component({
  selector: 'app-tomorrow',
  templateUrl: './tomorrow.component.html',
  styleUrls: ['./tomorrow.component.scss']
})
export class TomorrowComponent implements OnInit {

  public Tomorrow$!: Observable<Tomorrow | undefined>;
  constructor(private readonly sessionDataService: SessionDataService,
              private readonly previousRouteService : PreviousRouteService) { }

  ngOnInit(): void {
    this.Tomorrow$ = this.sessionDataService.getTomorrow$();
    this.previousRouteService.setLastUrl();
  }

}
