import { Component, OnInit } from '@angular/core';
import { SessionDataService } from 'src/app/shares/services/session-data.service';
import { PreviousRouteService } from 'src/app/shares/services/previous-route.service';
import { Current } from 'src/app/shares/interfaces/weather.interface';
import { User } from 'src/app/shares/interfaces/user.interface';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss'],
})
export class CurrentComponent implements OnInit {
  public Current$!: Observable<Current | undefined>;
  public User$!: Observable<User | undefined>;
  constructor(
    private readonly sessionDataService: SessionDataService,
    private readonly previousRouteService: PreviousRouteService
  ) {}

  ngOnInit(): void {
    this.Current$ = this.sessionDataService.getCurrent$();
    this.User$ = this.sessionDataService.getUser$();
    this.previousRouteService.setLastUrl();
  }
}
