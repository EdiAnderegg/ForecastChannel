import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Router } from '@angular/router';
import { Current } from 'src/app/shares/interfaces/current.interface';
import { WeatherService } from 'src/app/shares/services/weather.service';
import { IconService } from 'src/app/shares/services/icon.service';
import { SessionDataService } from 'src/app/shares/services/session-data.service';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { slideInAnimation } from 'src/app/shares/animation/slide.animation';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations:[slideInAnimation]
})
export class MainComponent implements OnInit {

  faSortUp = faSortUp;
  faSortDown = faSortDown;

  private Current : Current | undefined;
  public actualSite: string[] = ['current','today','']
  private index : number = 0;
  constructor(private readonly weatherService : WeatherService,
              private readonly iconService : IconService,
              private readonly sessionDataService : SessionDataService,
              private readonly router : Router)
              {}

  public btnstart(){
    this.router.navigateByUrl('/start');
  }

  public btndown(){
    this.index++;
    if(this.index == this.actualSite.length-1)
    {
      return this.router.navigateByUrl(`main/${this.actualSite[this.index -1]}`);
    }else{
      return this.router.navigateByUrl(`main/${this.actualSite[this.index]}`);
    }
  }

  ngOnInit(): void {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((pos)=>{
        this.weatherService.setWeather(pos.coords.latitude,pos.coords.longitude,'metric','');
        this.weatherService.getCurrentWeather$()
        .pipe(take(1))
        .subscribe((data) =>{
          this.Current = {...data};
          this.Current.icon = this.iconService.getIcon(this.Current.description);
          this.sessionDataService.outputWeather(this.Current);
        })
      })
    }
  }

}
