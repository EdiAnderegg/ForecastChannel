import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Current } from 'src/app/shares/interfaces/current.interface';
import { WeatherService } from 'src/app/shares/services/weather.service';
import { IconService } from 'src/app/shares/services/icon.service';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  faSortUp = faSortUp;
  faSortDown = faSortDown;

  public Current : Current | undefined;

  constructor(private readonly weatherService : WeatherService, private readonly iconService : IconService) {}

  ngOnInit(): void {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((pos)=>{
        this.weatherService.setWeather(pos.coords.latitude,pos.coords.longitude,'metric','');
        this.weatherService.getCurrentWeather$()
        .pipe(take(1))
        .subscribe((data) =>{
          this.Current = {...data};
          this.Current.icon = this.iconService.getIcon(this.Current.description);
          return this.Current;
        })
      })
    }
  }

}
