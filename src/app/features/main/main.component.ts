import { Component, OnInit,ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { take } from 'rxjs';
import { Router, RouterOutlet } from '@angular/router';
import { Current, Today, Tomorrow, Weather } from 'src/app/shares/interfaces/weather.interface';
import { WeatherService } from 'src/app/shares/services/weather.service';
import { IconService } from 'src/app/shares/services/icon.service';
import { SessionDataService } from 'src/app/shares/services/session-data.service';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { slider } from 'src/app/shares/animation/slide.animation';
import { fadeInAnimation } from 'src/app/shares/animation/fade-in.animation';







@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations:[slider, fadeInAnimation]
})
export class MainComponent implements OnInit, AfterViewInit {

  faSortUp = faSortUp;
  faSortDown = faSortDown;

  public Current : Current | undefined;
  public Today : Today | undefined;
  public Tomorrow : Tomorrow | undefined;
  public Weather : Weather | undefined;
  public actualSite: string[] = ['UV-Index','Current','Today','Tomorrow','5-Day Forecast',''];
  public urlTitle : string | undefined = '';
  public currentIndex : number = 1;
  public textLength : boolean = false;
  public display : boolean = true;


  constructor(private readonly weatherService : WeatherService,
              private readonly iconService : IconService,
              private readonly sessionDataService : SessionDataService,
              private readonly router : Router,
              private readonly cd : ChangeDetectorRef
              )
              {}

  public prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  private disableDisplay(){
    this.display = false
    setTimeout(()=>{
      return this.display = true
    },1);
  }

  private fontSize(){
    let strLength = document.querySelector('.body-title');
    if(strLength!.textContent!.length >= 10){
      strLength?.classList.add('small-title');
    } else{
      strLength?.classList.add('normal-title');
    }
  }
  public btnstart(){
    this.router.navigateByUrl('/start');
  }

  public btnSlide(increment: number){
    this.urlTitle = this.router.url.split('/').pop();
    const newIndex = this.currentIndex + increment;
    if (newIndex >= 1 && newIndex < this.actualSite.length) {
      this.currentIndex = newIndex;
      this.router.navigateByUrl(`main/${this.actualSite[newIndex].split(" ").join('.')}`);

      switch(this.actualSite[newIndex]){
        case'Current':
        this.Weather = this.Current;
        this.textLength = false;
          break
        case 'Today':
          this.Weather = this.Today;
          this.Weather!.wind.speed = this.Today!.wind.gust
          this.textLength = false;
          break
        case 'Tomorrow':
          this.Weather = this.Tomorrow;
          this.textLength = false;
          break
        case'5-Day Forecast':
        this.Weather = this.Tomorrow;
        this.textLength = true;
      }
    }
    this.disableDisplay()
  }


  isButtonDisabled(index: number): boolean {
    if(index === 0 || index === this.actualSite.length - 1)return true
    return false
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
            case '5-Day.Forecast':
              this.Weather = this.Tomorrow;
              this.currentIndex = 4;
              this.textLength = true;
              return
          }
        });
      });
    };
  }

  ngAfterViewInit(): void {
      this.fontSize();
      this.cd.detectChanges();
  }

}
