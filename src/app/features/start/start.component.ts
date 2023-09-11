import { Component, OnInit } from '@angular/core';
import { take} from 'rxjs';
import { Router } from '@angular/router';
import { WeatherService } from 'src/app/shares/services/weather.service';
import { IconService } from './../../shares/services/icon.service';
import { Current } from './../../shares/interfaces/current.interface';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  public Current : Current | undefined;

  constructor(private readonly weatherService : WeatherService,
    private readonly iconService : IconService,
    private readonly router : Router) {}

  public btnClick(){
    this.router.navigateByUrl('/main');
  }

 ngOnInit():void {
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition((pos)=>{
      this.weatherService.setWeather(pos.coords.latitude,pos.coords.longitude,'metric','');
      this.weatherService.getCurrentWeather$()
      .pipe(take(1))
      .subscribe((data) =>{
        console.log(data);
        this.Current = {...data};
        this.Current.icon = this.iconService.getIcon(this.Current.description);
        return this.Current;
      })
    })
  }
 }

}
