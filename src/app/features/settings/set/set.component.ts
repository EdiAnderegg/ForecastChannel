import { Component, OnInit } from '@angular/core';
import { PreviousRouteService } from 'src/app/shares/services/previous-route.service';
import { SessionDataService } from 'src/app/shares/services/session-data.service';
import { WeatherService } from 'src/app/shares/services/weather.service';
import { UvIndexService } from 'src/app/shares/services/uv-index.service';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { User } from 'src/app/shares/interfaces/user.interface';
import { Location } from 'src/app/shares/interfaces/location.interface';

@Component({
  selector: 'app-set',
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.scss']
})
export class SetComponent implements OnInit {

  public User$!: Observable<User | undefined>;
  public measure : string = 'metric';
  public speed : string = 'km/h';
  public location : Location | undefined;

  constructor(private readonly previousRouteService : PreviousRouteService,
    private readonly sessionDataService : SessionDataService,
    private readonly weatherService : WeatherService,
    private readonly router: Router,
    private readonly uvIndexService : UvIndexService
    ) {}

    public getBack(){
      this.sessionDataService.outputUser({
        lat : this.location?.lat!,
        lon : this.location?.lon!,
        tempUnit : this.measure,
        windSpeed : this.speed,
        location : this.location?.city!
      });
      this.weatherService.setWeather(this.location?.lat!,this.location?.lon!,this.measure,this.speed,this.location?.city!);
      this.uvIndexService.setUV(this.location?.lat!,this.location?.lon!);
      this.router.navigateByUrl(this.previousRouteService.getPreviousUrl());
    }

    public changeLocation(){
      this.weatherService.isSet = true;
      this.router.navigateByUrl('settings/region');
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
          this.location = {
            country : '',
            city : data?.location,
            lat : data?.lat,
            lon : data?.lon,
          }
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
