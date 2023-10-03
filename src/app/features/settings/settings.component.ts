import { Component, OnInit } from '@angular/core';
import { PreviousRouteService } from 'src/app/shares/services/previous-route.service';
import { SessionDataService } from 'src/app/shares/services/session-data.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/shares/interfaces/user.interface';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public User$!: Observable<User | undefined>;
  public measure : string = 'Metric';
  public speed : string = 'km/h';

  constructor(private readonly previousRouteService: PreviousRouteService,
              private readonly sessionDataService: SessionDataService,
              private readonly router: Router) {}

  public getBack(){
    this.router.navigateByUrl(this.previousRouteService.getPreviousUrl());
  }

  public changeTemp(){
    const h1 = document.getElementById('temp');
    if(h1!.textContent == 'Metric')return this.measure = 'Fahrenheit';
    return this.measure = 'Metric';
  }

  public changeSpeed(){
    const h1 = document.getElementById('speed');
    if(h1!.textContent == 'km/h')return this.speed = 'mph';
    return this.speed = 'km/h';
  }

  ngOnInit(): void {
    this.User$ = this.sessionDataService.getUser$();
  }
}
