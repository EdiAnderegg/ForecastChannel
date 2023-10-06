
import { Component, OnInit } from '@angular/core';
import { PreviousRouteService } from 'src/app/shares/services/previous-route.service';
import { SessionDataService } from 'src/app/shares/services/session-data.service';
import { WeatherService } from 'src/app/shares/services/weather.service';
import { NearLocationService } from 'src/app/shares/services/near-location.service';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { User } from 'src/app/shares/interfaces/user.interface';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public User$!: Observable<User | undefined>;
  public measure : string = 'metric';
  public speed : string = 'km/h';
  public location : string = '...';

  constructor(private readonly previousRouteService : PreviousRouteService,
              private readonly sessionDataService : SessionDataService,
              private readonly weatherService : WeatherService,
              private readonly router: Router) {}

  public getBack(){
    this.sessionDataService.outputUser({
      lat : 0,
      lon : 0,
      tempUnit : this.measure,
      windSpeed : this.speed,
      location : this.location
    });
    this.weatherService.setWeather(0,0,this.measure,this.speed,this.location);
    this.router.navigateByUrl(this.previousRouteService.getPreviousUrl());
  }

  public changeTemp(){
    this.weatherService.isSet = true;
    if(this.measure === 'metric')return this.measure = 'imperial';
    return this.measure = 'metric';
  }

  public changeSpeed(){
    this.weatherService.isSet = true;
    if(this.speed === 'km/h')return this.speed = 'mph';
    return this.speed = 'km/h';
  }

  ngOnInit(): void {
    this.User$ = this.sessionDataService.getUser$();
    this.User$.pipe(take(1)).subscribe(
      (data)=>{
        if(data?.location){
          this.location = data?.location!;
        }
        if(data?.tempUnit === 'imperial'){
          this.measure = 'imperial';
        }
        if(data?.windSpeed === 'mph'){
          this.speed = 'mph';
        }
      });
  }
}
