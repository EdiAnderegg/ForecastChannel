import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Router, RouterOutlet } from '@angular/router';
import { Current, Today, Tomorrow, Weather } from 'src/app/shares/interfaces/weather.interface';
import { WeatherService } from 'src/app/shares/services/weather.service';
import { IconService } from 'src/app/shares/services/icon.service';
import { SessionDataService } from 'src/app/shares/services/session-data.service';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { slider } from 'src/app/shares/animation/slide.animation';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations:[slider]
})
export class MainComponent implements OnInit {

  faSortUp = faSortUp;
  faSortDown = faSortDown;

  public Current : Current | undefined;
  public Today : Today | undefined;
  public Tomorrow : Tomorrow | undefined;
  public Weather : Weather | undefined;
  public actualSite: string[] = ['UV-Index','Current','Today','Tomorrow','5-Day Forecast'];
  public urlTitle : string | undefined = '';
  public currentIndex : number = 1;


  constructor(private readonly weatherService : WeatherService,
              private readonly iconService : IconService,
              private readonly sessionDataService : SessionDataService,
              private readonly router : Router
              )
              {}

  public prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  public btnstart(){
    this.router.navigateByUrl('/start');
  }

  public btnSlide(increment: number){
    this.urlTitle = this.router.url.split('/').pop();
    const newIndex = this.currentIndex + increment;
    if (newIndex >= 1 && newIndex < this.actualSite.length) {
      this.currentIndex = newIndex;
      this.router.navigateByUrl(`main/${this.actualSite[newIndex]}`);

      switch(this.actualSite[newIndex]){
        case'Current':
        this.Weather = this.Current;
          return
        case 'Today':
          this.Weather = this.Today;
          this.Weather!.wind.speed = this.Today!.wind.gust
          return
        case 'Tomorrow':
          this.Weather = this.Tomorrow;
          return
      }
    }
  }


  isButtonDisabled(index: number) {
    return index === 1 || index === this.actualSite.length - 1;
  }

  ngOnInit(): void {

    this.urlTitle = this.router.url.split('/').pop();

    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((pos)=>{
        this.weatherService.setWeather(pos.coords.latitude,pos.coords.longitude,'metric','');
        this.weatherService.getCurrentWeather$()
        .pipe(take(1))
        .subscribe((data) =>{
          this.Current = {...data[0]};
          this.Current!.icon = this.iconService.getIcon(this.Current!.description);
          this.sessionDataService.outputCurrent(this.Current);
          this.Today = {...data[1]};
          this.Today!.icon = this.iconService.getIcon(this.Today!.description);
          this.sessionDataService.outputToday(this.Today);

          switch(this.urlTitle){
            case'Current':
              this.Weather = this.Current;
              this.currentIndex = 1;
              return
            case 'Today':
              this.Weather = this.Today;
              this.currentIndex = 2;
              return
          }
        });
        this.weatherService.getWeekWeather$()
        .pipe(take(1))
        .subscribe((data) =>{
          this.Tomorrow = {...data};
          this.Tomorrow!.icon = this.iconService.getIcon(this.Tomorrow!.description);
          this.sessionDataService.outputTomorrow(this.Tomorrow);
          switch(this.urlTitle){
            case'Tomorrow':
              this.Weather = this.Tomorrow;
              this.currentIndex = 3;
              return
            case '5-Day Forecast':
              this.Weather = this.Tomorrow;
              this.currentIndex = 4;
              return
          }
        });
      });
    };
  }

}
