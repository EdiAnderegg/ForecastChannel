import { Component, OnInit,ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { take } from 'rxjs';
import { Router, RouterOutlet } from '@angular/router';
import { Current, Today, Tomorrow, Weather, weekArr } from 'src/app/shares/interfaces/weather.interface';
import { WeatherService } from 'src/app/shares/services/weather.service';
import { UvIndexService } from 'src/app/shares/services/uv-index.service';
import { IconService } from 'src/app/shares/services/icon.service';
import { SessionDataService } from 'src/app/shares/services/session-data.service';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { slider } from 'src/app/shares/animation/slide.animation';
import { fadeInAnimation } from 'src/app/shares/animation/fade-in.animation';
import { UV } from 'src/app/shares/interfaces/uv.interface';







@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations:[slider, fadeInAnimation]
})
export class MainComponent implements OnInit, AfterViewInit {

  faSortUp = faSortUp;
  faSortDown = faSortDown;

  public uv : UV | undefined;
  public Current : Current | undefined;
  public Today : Today | undefined;
  public Tomorrow : Tomorrow | undefined;
  public Week : weekArr | undefined;
  public Weather : Weather | undefined;
  public actualSite: string[] = ['','UV Index','Current','Today','Tomorrow','5-Day Forecast',''];
  public urlTitle : string | undefined = '';
  public currentIndex : number = 1;
  public textLength : boolean = false;
  public display : boolean = true;


  constructor(private readonly weatherService : WeatherService,
              private readonly iconService : IconService,
              private readonly sessionDataService : SessionDataService,
              private readonly router : Router,
              private readonly cd : ChangeDetectorRef,
              private readonly uvService : UvIndexService
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

  public btnstart(){
    this.router.navigateByUrl('/start');
  }

  public btnSlide(increment: number){
    this.urlTitle = this.router.url.split('/').pop();
    const newIndex = this.currentIndex + increment;
    if (newIndex >= 1 && newIndex < this.actualSite.length) {
      this.currentIndex = newIndex;
      this.router.navigateByUrl(`main/${this.actualSite[newIndex].split(" ").join('_')}`);

      switch(this.actualSite[newIndex]){
        case'UV Index':
        this.Weather = this.Current;
        this.textLength = false;
        break
        case'Current':
        this.Weather = this.Current;
        this.textLength = false;
          break
        case 'Today':
          this.Weather = this.Today;
          this.textLength = false;
          break
        case 'Tomorrow':
          this.Weather = this.Tomorrow;
          this.textLength = false;
          break
        case'5-Day Forecast':
        this.Weather = this.Week;
        this.textLength = true;
          break
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
        //this.uvService.setUV(pos.coords.latitude, pos.coords.longitude);
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
              this.currentIndex = 2;
              return
            case 'Today':
              this.Weather = this.Today;
              this.currentIndex = 3;
              return
          }
        });
        this.weatherService.getWeekWeather$()
        .pipe(take(1))
        .subscribe((data) =>{
          this.Tomorrow = {...data[0]};
          this.Tomorrow!.icon = this.iconService.getIcon(this.Tomorrow!.description);
          this.sessionDataService.outputTomorrow(this.Tomorrow);
          this.Week = {...data[1]};
          for(let i = 0; i <= 4; i++){
            this.Week!.days[i]!.icon = this.iconService.getIcon(this.Week!.days[i]!.description);
          }
          this.sessionDataService.outputWeek(this.Week);

          switch(this.urlTitle){
            case'Tomorrow':
            this.Weather = this.Tomorrow;
              this.currentIndex = 4;
              return
            case '5-Day_Forecast':
              this.Weather = this.Week;
              this.currentIndex = 5;
              this.textLength = true;
              return
          }
        });
        /*this.uvService.getUV$()
        .pipe(take(1))
        .subscribe((data)=>{
          this.uv = {...data};
          this.sessionDataService.outputUv(this.uv);
          if(this.urlTitle === 'UV-Index'){
           this.currentIndex = 1;
           setTimeout(()=>{
            this.Weather = this.Current;
           },1)
           return
          }

        });*/
      });
    };
  }

  ngAfterViewInit(): void {
      this.cd.detectChanges();
  }

}
