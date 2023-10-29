
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

 
  private uv : UV | undefined;
  private current : Current | undefined;
  private today : Today | undefined;
  private tomorrow : Tomorrow | undefined;
  private week : weekArr | undefined;
  public weather : Weather | undefined;
  public actualSite: string[] = ['','UV Index','Current','Today','Tomorrow','5-Day Forecast',''];
  public urlTitle : string | undefined = '';
  public currentIndex : number = 1;
  public textLength : boolean = false;
  public display : boolean = true;


  constructor(
              private readonly weatherService : WeatherService,
              private readonly iconService : IconService,
              private readonly sessionDataService : SessionDataService,
              private readonly router : Router,
              private readonly cd : ChangeDetectorRef,
              private readonly uvService : UvIndexService,
              )
              {}

              ngOnInit(): void {
                this.urlTitle = this.router.url.split('/').pop();
                this.initializeData();
              }
            
              ngAfterViewInit(): void {
                this.cd.detectChanges();
              }
            
              private initializeData(): void {
                if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition((pos) => {
                    if (!this.weatherService.isSet) {
                      this.weatherService.setWeather(pos.coords.latitude, pos.coords.longitude, 'metric', 'km/h', '');
                      this.uvService.setUV(pos.coords.latitude, pos.coords.longitude);
                    }
            
                    this.weatherService.getCurrentWeather$()
                      .pipe(take(1))
                      .subscribe((data) => {
                        this.current = { ...data[0] };
                        this.current!.icon = this.iconService.getIcon(this.current?.description!);
                        this.sessionDataService.outputCurrent(this.current);
                        this.today = { ...data[1] };
                        this.today!.icon = this.iconService.getIcon(this.today?.description!);
                        this.sessionDataService.outputToday(this.today);
            
                        if (!this.weatherService.isSet) {
                          this.sessionDataService.outputUser({
                            lat: pos.coords.latitude,
                            lon: pos.coords.longitude,
                            tempUnit: 'metric',
                            windSpeed: 'km/h',
                            location: data[0].location
                          });
                        }
                        this.handleUrlTitle();
                      });
            
                    this.weatherService.getWeekWeather$()
                      .pipe(take(1))
                      .subscribe((data) => {
                        this.tomorrow = { ...data[0] };
                        this.tomorrow!.icon = this.iconService.getIcon(this.tomorrow?.description!);
                        this.sessionDataService.outputTomorrow(this.tomorrow);
                        this.week = { ...data[1] };
                        for (let i = 0; i <= 4; i++) {
                          this.week!.days[i].icon = this.iconService.getIcon(this.week?.days[i].description);
                        }
                        this.sessionDataService.outputWeek(this.week);
            
                        this.handleUrlTitle();
                      });
            
                    this.uvService.getUV$()
                      .pipe(take(1))
                      .subscribe((data) => {
                        this.uv = { ...data };
                        this.sessionDataService.outputUv(this.uv);
                        this.handleUrlTitle();
                      });
                  });
                }
              }
            
              private handleUrlTitle(): void {
                switch (this.urlTitle) {
                  case 'Current':
                    this.weather = this.current;
                    this.currentIndex = 2;
                    break;
                  case 'Today':
                    this.weather = this.today;
                    this.currentIndex = 3;
                    break;
                  case 'Tomorrow':
                    this.weather = this.tomorrow;
                    this.currentIndex = 4;
                    break;
                  case '5-Day_Forecast':
                    this.weather = this.week;
                    this.currentIndex = 5;
                    this.textLength = true;
                    break;
                  case 'UV_Index':
                    this.weather = this.current;
                    this.currentIndex = 1;
                    break;
                }
              }
              
              private ctrlLongTitle(url:string){
                if(url === 'main/5-Day_Forecast'){
                  this.textLength = true;
                  return
                }
                this.textLength = false;
              }

              public prepareRoute(outlet: RouterOutlet): any {
                return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
              }
            
              public disableDisplay(): void {
                this.display = false;
                setTimeout(() => {
                  this.display = true;
                }, 1);
              }
            
              public btnstart(): void {
                this.router.navigateByUrl('/start');
              }
            
              public btnSettings(): void {
                this.router.navigateByUrl('/settings');
              }
            
              public btnSlide(increment: number): void {
                this.urlTitle = this.router.url.split('/').pop();
                const newIndex = this.currentIndex + increment;
              
                if (newIndex >= 1 && newIndex < this.actualSite.length) {
                  this.currentIndex = newIndex;
              
                  // Only set the router URL once
                  const newRoute = `main/${this.actualSite[newIndex].split(" ").join('_')}`;
                  this.ctrlLongTitle(newRoute);
                  this.router.navigateByUrl(newRoute);
                }
              
                this.disableDisplay();
              }
              
            
              public isButtonDisabled(index: number): boolean {
                return index === 0 || index === this.actualSite.length - 1;
              }
            
}
